import { EventAttendee } from "@prisma/client";
import { MemberRepoDto } from "./member-types";

export type EventAttendeeCreateRepoDto = Omit<EventAttendee, 'createdAt'>;
export type EventAttendeeDetailsRepoDto = EventAttendee & { member: MemberRepoDto };
export type EventAttendeCreateServiceDto = Omit<EventAttendee, 'createdAt'>;
export type EventAttendeDeleteServiceDto = Omit<EventAttendee, 'createdAt'>;