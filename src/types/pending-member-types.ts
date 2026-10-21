import { PendingMember } from "@prisma/client";

export type PendingMemberCreateRepoDto = Omit<PendingMember, "id" | "createdAt">;
export type PendingMemberCreateServiceDto = Omit<PendingMember, "id" | "token" | "createdAt">;