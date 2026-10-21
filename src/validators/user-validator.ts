import BadRequestException from "../exceptions/bad-request-exception";
import { UserUpdateByIdServiceDto } from "../types/user-types";

class UserValidator {
    public static validateUpdateById(data: Record<string, any>, file?: Express.Multer.File): UserUpdateByIdServiceDto {
        const fields: string[] = ["firstName", "lastName", "birthDate", "username", "gender", "tags"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            tags: JSON.parse(data.tags),
            gender: data.gender,
            birthDate: new Date(data.birthDate),
            avatarUri: file ? file.filename : null,
        }
    }
}

export default UserValidator;