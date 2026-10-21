import {
    Tag,
    EventTag
} from "@prisma/client";

export type EventTagCreateRepoDto = EventTag;
export type EventTagDetailsRepoDto = EventTag & { tag: Tag };
export type EventTagCreateServiceDto = EventTag;