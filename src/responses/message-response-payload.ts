import { Severity } from "../enums/severity-enum";
import { BaseResponsePayload } from "./base-response-payload";

export class MessageResponsePayload extends BaseResponsePayload {
    constructor(message: string, severity: Severity) {
        super(message, severity);
    }

    public static success(message: string): MessageResponsePayload {
        return new MessageResponsePayload(message, Severity.Success);
    }

    public static info(message: string): MessageResponsePayload {
        return new MessageResponsePayload(message, Severity.Info);
    }
}