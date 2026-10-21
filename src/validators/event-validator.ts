import BadRequestException from "../exceptions/bad-request-exception";
import {
    EventCreateServiceDto,
    GetNearbyEventsServiceDto
} from "../types/event-types";

class EventValidator {
    public static validateCreate(
        data: Record<string, string>,
        galleryFiles: Express.Multer.File[],
        imageFiles?: Express.Multer.File[]
    ): EventCreateServiceDto {
        const fields: string[] = [
            "lat",
            "lng",
            "tags",
            "title",
            "price",
            "hostId",
            "isPaid",
            "hostId",
            "currency",
            "startDate",
            "description",
            "maxAttendees"
        ];

        if (!imageFiles || imageFiles.length === 0) {
            throw new BadRequestException("The image file is missing from form data!");
        }

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request body!`);
            }
        }

        return {
            title: data.title,
            description: data.description,
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
            tags: JSON.parse(data.tags),
            hostId: data.hostId,
            imageUri: imageFiles[0].filename,
            gallery: galleryFiles.map((file) => file.filename),
            isPaid: data.isPaid === "true",
            price: parseFloat(data.price),
            currency: data.currency,
            maxAttendees: parseInt(data.maxAttendees)
        }
    }

    public static validateGetNearby(data: Record<string, string>): GetNearbyEventsServiceDto {
        const fields: string[] = ["lat", "lng", "radius"];

        for (const field of fields) {
            if (!(field in data)) {
                throw new BadRequestException(`The field '${field}' is missing from request query params!`);
            }
        }

        return {
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            radius: parseFloat(data.radius)
        }
    }
}

export default EventValidator;