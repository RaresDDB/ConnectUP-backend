import { Tag } from "@prisma/client";

export type TagCreateRepoDto = Omit<Tag, "id">;
export type TagGetOrCreateDto = Omit<Tag, "id">;
export type TagCreateServiceDto = Omit<Tag, "id">;