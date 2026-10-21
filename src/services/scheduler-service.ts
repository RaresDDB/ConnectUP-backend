import cron from 'node-cron';
import EmailUtils from '../utils/email-utils';
import EventService from './event-service';
import NotificationLogService from './notification-log-service';

class SchedulerService {
    private eventService: EventService;
    private notificationLogService: NotificationLogService

    constructor(
        eventService: EventService,
        notificationLogService: NotificationLogService
    ) {
        this.eventService = eventService;
        this.notificationLogService = notificationLogService;
    }

    startScheduler() {
        cron.schedule('* * * * *', async () => {
            console.log('Checking for upcoming events...');

            const oneDayFromNow = new Date();
            oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

            const upcomingEvents = await this.eventService.getUpcoming(oneDayFromNow);

            console.log(`Found ${upcomingEvents.length} upcoming events`);

            upcomingEvents.forEach(({ id: eventId, title, startDate, attendees }) => {
                console.log(`Event ${title} is starting in less than a day!`);

                attendees.forEach(async ({ id: attendeeId, email, firstName, lastName }) => {
                    const notificationLog = await this.notificationLogService.getByUserIdEventId(attendeeId, eventId);

                    if (!notificationLog) {
                        EmailUtils.sendReminderEmail(email, title, startDate, `${firstName} ${lastName}`);
                        await this.notificationLogService.create({ userId: attendeeId, eventId });
                    }
                });
            });
        });
    }
}

export default SchedulerService;