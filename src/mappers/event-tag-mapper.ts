import TagMapper from "./tag-mapper";
import { EventTagDetailsRepoDto } from "../types/event-tag-types";

class EventTagMapper {
    public static repoToService(eventTag: EventTagDetailsRepoDto) {
        return TagMapper.repoToService(eventTag.tag);
    }
}

export default EventTagMapper;