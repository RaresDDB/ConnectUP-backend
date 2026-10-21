import { UserRepoDto } from "./user-types";
import {
    User,
    Member
} from "@prisma/client";

export type MemberCreateRepoDto = Member;

export type MemberRepoDto = Member
    & { user: UserRepoDto };

export type MemberCreateServiceDto = Omit<User, "id" | "roleId">
    & {
        tags: string[]
    };