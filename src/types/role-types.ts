import { Role } from "@prisma/client";

export type RoleCreateRepoDto = Omit<Role, "id">;
export type RoleGetOrCreateDto = Omit<Role, "id">;
export type RoleCreateServiceDto = Omit<Role, "id">;