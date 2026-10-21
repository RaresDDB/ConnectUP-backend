import { Severity } from "../enums/severity-enum";
import { EventAttendee } from "@prisma/client";

export class AttendEventResponsePayload {
    private constructor(public message: string, public severity: Severity, public eventAttendee: EventAttendee) { }

    public static success(message: string, eventAttendee: EventAttendee): AttendEventResponsePayload {
        return new AttendEventResponsePayload(message, Severity.Success, eventAttendee);
    }
}