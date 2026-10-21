import { NotificationLog } from "@prisma/client";

export type NotificationLogCreateRepoDto = Omit<NotificationLog, "id" | "sentAt">;
export type NotificationLogGetOrCreateDto = Omit<NotificationLog, "id" | "sentAt">;
export type NotificationLogCreateServiceDto = Omit<NotificationLog, "id" | "sentAt">;