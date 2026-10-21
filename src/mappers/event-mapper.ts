import ReviewMapper from "./review-mapper";
import MemberMapper from "./member-mapper";
import QuestionMapper from "./question-mapper";
import EventTagMapper from "./event-tag-mapper";
import PaidEventMapper from "./paid-event-mapper";
import EventAttendeeMapper from "./event-attendee-mapper";
import { EventRepoDto } from "../types/event-types";

class EventMapper {
    public static repoToService(event: EventRepoDto) {
        const { hostId, reviews, questions, paidEvent, eventTags, eventAttendees, ...rest } = event;

        return {
            ...rest,
            host: MemberMapper.repoToService(event.host),
            tags: event.eventTags.map((eventTag) => EventTagMapper.repoToService(eventTag)),
            reviews: event.reviews.map((review) => ReviewMapper.repoToService(review)),
            paidEvent: paidEvent && PaidEventMapper.repoToService(paidEvent),
            questions: event.questions.map((question) => QuestionMapper.repoToService(question)),
            attendees: event.eventAttendees.map((eventAttendee) => EventAttendeeMapper.repoToService(eventAttendee))
        };
    }
}

export default EventMapper;