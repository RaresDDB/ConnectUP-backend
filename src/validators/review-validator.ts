import BadRequestException from "../exceptions/bad-request-exception";
import { UserDto } from "../types/user-types";
import { ReviewCreateServiceDto } from "../types/review-types";

class ReviewValidator {
    public static validateCreate(
        data: Record<string, string>,
        user: UserDto
    ): ReviewCreateServiceDto {
        const fields: string[] = ["title", "text", "eventId"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            title: data.title,
            text: data.text,
            rating: parseInt(data.rating),
            eventId: data.eventId,
            memberId: user.id
        }
    }
}

export default ReviewValidator;