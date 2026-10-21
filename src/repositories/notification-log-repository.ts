import { PrismaClient } from '@prisma/client';
import { NotificationLogCreateRepoDto } from '../types/notification-log-types';

class NotificationLogRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: NotificationLogCreateRepoDto) {
        return this.client.notificationLog.create({ data });
    }

    async findAll() {
        return this.client.notificationLog.findMany();
    }

    async findById(id: string) {
        return this.client.notificationLog.findUnique({ where: { id } });
    }

    async findByUserIdAndEventId(userId: string, eventId: string) {
        return this.client.notificationLog.findUnique({
            where: {
                userId_eventId: {
                    userId: userId,
                    eventId: eventId
                }
            }
        })
    }
}

export default NotificationLogRepository;
