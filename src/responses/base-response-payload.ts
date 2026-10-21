import { Severity } from "../enums/severity-enum";

export class BaseResponsePayload {
    constructor(public message: string, public severity: Severity) { }
}