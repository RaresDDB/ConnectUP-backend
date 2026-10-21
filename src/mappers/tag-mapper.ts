import { Tag } from "@prisma/client";

class TagMapper {
    public static repoToService(tag: Tag) {
        return tag;
    }
}

export default TagMapper;