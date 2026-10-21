import haversine from "haversine-distance";
import TagService from "./tag-service";
import EventMapper from "../mappers/event-mapper";
import FavoriteService from "./favorite-service";
import EventTagService from "./event-tag-service";
import EventRepository from "../repositories/event-repository";
import GeocodingService from "./geocoding-service";
import PaidEventService from "./paid-event-service";
import NotFoundException from "../exceptions/not-found-exception";
import EventAttendeeService from "./event-attendee-service";
import { Role } from "../enums/role-enum";
import { UserDto } from "../types/user-types";
import {
    EventCreateServiceDto,
    EventRepoDto,
    GetNearbyEventsServiceDto
} from "../types/event-types";
import DateUtils from "../utils/date-utils";

class EventService {
    private tagService: TagService;
    private favoriteService: FavoriteService;
    private eventTagService: EventTagService;
    private geocodingService: GeocodingService;
    private paidEventService: PaidEventService;
    private eventAttendeeService: EventAttendeeService;
    private repository: EventRepository;

    constructor(
        tagService: TagService,
        eventTagService: EventTagService,
        favoriteService: FavoriteService,
        geocodingService: GeocodingService,
        paidEventService: PaidEventService,
        eventAttendeeService: EventAttendeeService,
        repository: EventRepository
    ) {
        this.tagService = tagService;
        this.eventTagService = eventTagService;
        this.favoriteService = favoriteService;
        this.geocodingService = geocodingService;
        this.paidEventService = paidEventService;
        this.eventAttendeeService = eventAttendeeService;
        this.repository = repository;
    }

    // TODO: modify type from any
    async enrichEvent(event: any, memberId: string) {
        const [isFavorite, isAttending] = await Promise.all([
            this.favoriteService.existsByEventIdAndMemberId(event.id, memberId),
            this.eventAttendeeService.existsByEventIdAndMemberId(event.id, memberId)
        ]);

        return {
            ...event,
            favorite: isFavorite,
            attended: isAttending
        };
    }

    async create(data: EventCreateServiceDto) {
        const address = await this.geocodingService.getDetailsByCoords(
            data.lat,
            data.lng
        );

        const { tags, isPaid, price, currency, maxAttendees, ...rest } = data;

        const createdEvent = await this.repository.create({
            ...rest,
            address
        });

        if (isPaid) {
            await this.paidEventService.create({
                id: createdEvent.id,
                price,
                currency,
                maxAttendees
            });
        }

        for (const tag of tags) {
            const createdTag = await this.tagService.gerOrCreate({
                name: tag
            });

            const eventTagExists = await this.eventTagService.existsByEventIdAndTagId(
                createdEvent.id,
                createdTag.id
            );

            if (!eventTagExists) {
                await this.eventTagService.create({
                    tagId: createdTag.id,
                    eventId: createdEvent.id
                });
            }
        }

        await this.eventAttendeeService.create({
            eventId: createdEvent.id,
            memberId: data.hostId
        });

        return this.getById(createdEvent.id);
    }

    async getAll(loggedUser: UserDto) {
        const events = await this.repository.findAll();

        const mappedEvents = events.map(event => EventMapper.repoToService(event));

        if (loggedUser.role.name === Role.Member) {
            return Promise.all(mappedEvents.map(event => this.enrichEvent(event, loggedUser.id)));
        }

        return mappedEvents;
    }

    async getById(id: string) {
        const event = await this.repository.findById(id);

        if (!event) {
            throw new NotFoundException('Event not found!');
        }

        return {
            ...EventMapper.repoToService(event),
            attendanceStats: this.calculateAttendanceStats(event),
        }
    }

    private calculateAttendanceStats(event: EventRepoDto) {
        const attendees = event.eventAttendees || [];
        const totalAttendees = attendees.length;

        // Define age and gender categories
        const AGE_GROUPS = ['Under 18', '18-25', '26-35', '36-49', '50+'] as const;
        const GENDER_GROUPS = ['Male', 'Female', 'Other'] as const;

        // Create empty stats with a generic helper function
        const createEmptyStats = <T extends readonly string[]>(groups: T) =>
            Object.fromEntries(groups.map(group => [group, 0])) as Record<T[number], number>;

        const emptyStats = {
            byAge: createEmptyStats(AGE_GROUPS),
            byGender: createEmptyStats(GENDER_GROUPS),
            topTags: [] as string[]
        };

        if (totalAttendees === 0) {
            return emptyStats;
        }

        // Helper functions
        const getAgeGroup = (age: number): typeof AGE_GROUPS[number] => {
            if (age < 18) return 'Under 18';
            if (age <= 25) return '18-25';
            if (age <= 35) return '26-35';
            if (age <= 49) return '36-49';
            return '50+';
        };

        const getGenderGroup = (gender: string): typeof GENDER_GROUPS[number] =>
            (gender === 'Male' || gender === 'Female') ? gender : 'Other';

        // Convert counts to percentages
        const toPercentages = (counts: Record<string, number>) =>
            Object.entries(counts).reduce((acc, [key, value]) => {
                acc[key] = Math.round((value / totalAttendees) * 100);
                return acc;
            }, {} as Record<string, number>);

        // Count attendees by age and gender in a single reduce operation
        const { ageGroups, genderGroups } = attendees.reduce(
            (acc, attendee) => {
                const user = attendee.member.user;
                const age = DateUtils.calculateAge(new Date(user.birthDate));
                const gender = user.gender || 'Other';

                acc.ageGroups[getAgeGroup(age)]++;
                acc.genderGroups[getGenderGroup(gender)]++;

                return acc;
            },
            {
                ageGroups: { ...emptyStats.byAge },
                genderGroups: { ...emptyStats.byGender }
            }
        );

        // Count and sort tags using functional chaining
        const topTags = Array.from(
            attendees.reduce((acc, attendee) => {
                const userTags = attendee.member.user.userTags || [];

                userTags.forEach(userTag => {
                    const tagName = userTag.tag.name;
                    acc.set(tagName, (acc.get(tagName) || 0) + 1)
                })

                return acc;
            }, new Map<string, number>())
        ).sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([tagName]) => tagName);

        return {
            byAge: toPercentages(ageGroups),
            byGender: toPercentages(genderGroups),
            topTags
        };
    }

    async getNearby(data: GetNearbyEventsServiceDto, loggedUser: UserDto) {
        const { lat, lng, radius } = data;

        const events = await this.repository.findAll();

        const userLocation = { lat, lng };

        const nearbyEvents = events.filter(event => {
            const eventLocation = { lat: event.lat, lng: event.lng };
            const distance = haversine(userLocation, eventLocation);
            return distance < radius;
        });

        const mappedEvents = nearbyEvents.map(event => EventMapper.repoToService(event));

        return Promise.all(mappedEvents.map(event => this.enrichEvent(event, loggedUser.id)));
    }

    async getUpcoming(date: Date) {
        const events = await this.repository.findUpcoming(date);
        return events.map(event => EventMapper.repoToService(event));
    }

    async deleteById(id: string) {
        const event = await this.repository.findById(id);

        if (!event) {
            throw new NotFoundException('Event not found!');
        }

        return this.repository.deleteById(id);
    }
}

export default EventService;