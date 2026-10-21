import { MemberRepoDto } from "./member-types";
import { ReviewDetailsRepoDto } from "./review-types";
import { QuestionDetailsRepoDto } from "./question-types";
import { EventTagDetailsRepoDto } from "./event-tag-types";
import { EventAttendeeDetailsRepoDto } from "./event-attendee-types";
import {
    Event,
    PaidEvent
} from "@prisma/client";

export type EventCreateRepoDto = Omit<Event, "id" | "createdAt">;

export type EventCreateServiceDto = Omit<Event, "id" | "address" | "createdAt">
    & Omit<PaidEvent, "id">
    & { tags: string }
    & { isPaid: boolean };

export type GetNearbyEventsServiceDto = {
    lat: number,
    lng: number,
    radius: number
}

export type EventRepoDto = Event
    & { host: MemberRepoDto }
    & { reviews: ReviewDetailsRepoDto[] }
    & { paidEvent: PaidEvent | null }
    & { questions: QuestionDetailsRepoDto[] }
    & { eventTags: EventTagDetailsRepoDto[] }
    & { eventAttendees: EventAttendeeDetailsRepoDto[] };