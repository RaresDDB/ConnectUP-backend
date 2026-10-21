import { Severity } from "../enums/severity-enum";
import { BaseResponsePayload } from "./base-response-payload";

export class ErrorResponsePayload extends BaseResponsePayload {
    constructor(message: string) {
        super(message, Severity.Error);
    }
}