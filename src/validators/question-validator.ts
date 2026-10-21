import BadRequestException from "../exceptions/bad-request-exception";
import { UserDto } from "../types/user-types";
import { QuestionCreateServiceDto } from "../types/question-types";

class QuestionValidator {
    public static validateCreate(
        data: Record<string, any>,
        user: UserDto
    ): QuestionCreateServiceDto {
        const fields: string[] = ["title", "text", "eventId", "mentionedUsernames"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            title: data.title,
            text: data.text,
            eventId: data.eventId,
            memberId: user.id,
            mentionedUsernames: data.mentionedUsernames
        }
    }
}

export default QuestionValidator;