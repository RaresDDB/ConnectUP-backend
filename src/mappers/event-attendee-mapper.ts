import MemberMapper from "./member-mapper";
import { EventAttendeeDetailsRepoDto } from "../types/event-attendee-types";

class EventAttendeeMapper {
    public static repoToService(eventAttendee: EventAttendeeDetailsRepoDto) {
        return MemberMapper.repoToService(eventAttendee.member);
    }
}

export default EventAttendeeMapper;