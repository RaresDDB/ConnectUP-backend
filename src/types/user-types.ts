import {
    Tag,
    User,
    Role
} from "@prisma/client";

export type UserDto = Omit<User, 'password' | 'roleId'> & { role: Role, tags: Tag[] };

export type UserCreateRepoDto = Omit<User, 'id'>;

export type UserUpdateByIdRepoDto = Omit<User, 'id'>;

export type UserPatchByIdRepoDto = Partial<Omit<User, 'id'>>;

export type UserCreateServiceDto = Omit<User, 'id'>;

export type UserUpdateByIdServiceDto = Omit<User, 'id' | 'email' | 'password' | 'roleId'> & { tags: string[] };

export type UserRepoDto = User
    & { role: Role }
    & { userTags: { tag: Tag }[] };