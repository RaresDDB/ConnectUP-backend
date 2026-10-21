import ConflictException from "../exceptions/conflict-exception";
import NotFoundException from "../exceptions/not-found-exception";
import EventTagRepository from "../repositories/event-tag-repository";
import { EventTag } from "@prisma/client";
import { EventTagCreateServiceDto } from "../types/event-tag-types";

class EventTagService {
    private repository: EventTagRepository;

    constructor(repository: EventTagRepository) {
        this.repository = repository;
    }

    async create(data: EventTagCreateServiceDto): Promise<EventTag> {
        const eventTag = await this.repository.findByEventIdAndTagId(data.eventId, data.tagId);

        if (eventTag) {
            throw new ConflictException('Already exists an event tag with this event id and tag id!');
        }

        return this.repository.create(data);
    }

    async getAllByEventId(eventId: string): Promise<EventTag[]> {
        return this.repository.findAllByEventId(eventId);
    }

    async getByEventIdAndTagId(eventId: string, tagId: string): Promise<EventTag> {
        const eventTag = await this.repository.findByEventIdAndTagId(eventId, tagId);

        if (!eventTag) {
            throw new NotFoundException("There is no event tag with this event id and tag id!");
        }

        return eventTag;
    }

    async existsByEventIdAndTagId(eventId: string, tagId: string): Promise<boolean> {
        const eventTag = await this.repository.findByEventIdAndTagId(eventId, tagId);
        return !!eventTag;
    }
}

export default EventTagService;