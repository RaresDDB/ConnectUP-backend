import NotFoundException from "../exceptions/not-found-exception";
import NotificationLogRepository from "../repositories/notification-log-repository";
import { NotificationLogCreateServiceDto } from "../types/notification-log-types";

class NotificationLogService {
    private repository: NotificationLogRepository;

    constructor(repository: NotificationLogRepository) {
        this.repository = repository;
    }

    async create(data: NotificationLogCreateServiceDto) {
        return this.repository.create(data);
    }

    async getById(id: string) {
        const notificationLog = await this.repository.findById(id);

        if (!notificationLog) {
            throw new NotFoundException(`There is no notification log with this id!`);
        }

        return notificationLog;
    }

    async getByUserIdEventId(userId: string, eventId: string) {
        return this.repository.findByUserIdAndEventId(userId, eventId);
    }
}

export default NotificationLogService;