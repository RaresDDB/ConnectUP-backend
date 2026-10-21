import {
    User,
    Admin
} from "@prisma/client";

export type AdminCreateRepoDto = Admin;
export type AdminCreateServiceDto = Omit<User, "id" | "avatarUri" | "roleId"> & {
    tags: string[]
};