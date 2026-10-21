import ConflictException from "../exceptions/conflict-exception";
import NotFoundException from "../exceptions/not-found-exception";
import EventAttendeeRepository from "../repositories/event-attendee-repository";
import {
    EventAttendeCreateServiceDto,
    EventAttendeDeleteServiceDto
} from "../types/event-attendee-types";

class EventAttendeeService {
    private repository: EventAttendeeRepository;

    constructor(
        repository: EventAttendeeRepository
    ) {
        this.repository = repository;
    }

    async create(data: EventAttendeCreateServiceDto) {
        const eventAttendee = await this.repository.findByEventIdAndMemberId(data.eventId, data.memberId);

        if (eventAttendee) {
            throw new ConflictException('You have already attended to this event!');
        }

        await this.repository.create(data);
    }

    async delete(data: EventAttendeDeleteServiceDto) {
        const eventAttendee = await this.repository.findByEventIdAndMemberId(data.eventId, data.memberId);

        if (!eventAttendee) {
            throw new NotFoundException('You have not attended to this event!');
        }

        await this.repository.deleteByEventIdAndMemberId(data.eventId, data.memberId);
    }

    async existsByEventIdAndMemberId(eventId: string, memberId: string) {
        const eventAttendee = await this.repository.findByEventIdAndMemberId(eventId, memberId);
        return !!eventAttendee;
    }
}

export default EventAttendeeService;