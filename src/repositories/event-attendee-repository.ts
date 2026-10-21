import { PrismaClient } from '@prisma/client';
import { EventAttendeeCreateRepoDto } from '../types/event-attendee-types';

class EventAttendeeRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: EventAttendeeCreateRepoDto) {
        return this.client.eventAttendee.create({ data });
    }

    async findByEventIdAndMemberId(eventId: string, memberId: string) {
        return this.client.eventAttendee.findFirst({
            where: {
                eventId,
                memberId
            }
        });
    }

    async deleteByEventIdAndMemberId(eventId: string, memberId: string) {
        return this.client.eventAttendee.delete({
            where: {
                eventId_memberId: {
                    eventId,
                    memberId
                }
            }
        })
    }
}

export default EventAttendeeRepository;
