import { PrismaClient } from '@prisma/client';
import { EventTagCreateRepoDto } from '../types/event-tag-types';

class EventTagRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: EventTagCreateRepoDto) {
        return this.client.eventTag.create({ data });
    }

    async findAllByEventId(eventId: string) {
        return this.client.eventTag.findMany({
            where: {
                eventId
            }
        });
    }

    async findByEventIdAndTagId(eventId: string, tagId: string) {
        return this.client.eventTag.findFirst({
            where: {
                eventId,
                tagId
            }
        });
    }
}

export default EventTagRepository;
