import asyncHandler from "express-async-handler"
import EventService from "../../services/event-service";
import AuthValidator from "../../validators/auth-validator";
import EventValidator from "../../validators/event-validator";
import FavoriteService from "../../services/favorite-service";
import EventAttendeeService from "../../services/event-attendee-service";
import { Request } from "express";
import { MessageResponsePayload } from "../../responses/message-response-payload";

interface CreateEventRequest extends Request {
    files: {
        image: Express.Multer.File[],
        gallery: Express.Multer.File[]
    }
}

class EventController {
    private eventService: EventService;
    private favoriteService: FavoriteService;
    private eventAttendeeService: EventAttendeeService;

    constructor(
        eventService: EventService,
        favoriteService: FavoriteService,
        eventAttendeeService: EventAttendeeService
    ) {
        this.eventService = eventService;
        this.favoriteService = favoriteService;
        this.eventAttendeeService = eventAttendeeService;
    }

    create = asyncHandler(async (req, res) => {
        const request = req as CreateEventRequest;

        const requestPayload = EventValidator.validateCreate(req.body, request.files.gallery, request.files.image);

        const event = await this.eventService.create(requestPayload);

        res.status(201).json({
            event,
            ...MessageResponsePayload.success('Event was created successfully!')
        });
    })

    getAll = asyncHandler(async (req, res) => {
        const user = AuthValidator.validateAuth(req.user);
        const events = await this.eventService.getAll(user);
        res.json({ events });
    })

    attend = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = AuthValidator.validateAuth(req.user);
        await this.eventAttendeeService.create({ eventId: id, memberId: user.id });
        res.json(MessageResponsePayload.success('You have successfully attend to the event!'));
    })

    unattend = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = AuthValidator.validateAuth(req.user);
        await this.eventAttendeeService.delete({ eventId: id, memberId: user.id });
        res.json(MessageResponsePayload.success('You have successfully unattended to the event!'));
    })

    getById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const event = await this.eventService.getById(id);
        res.json(event);
    })

    getNearby = asyncHandler(async (req, res) => {
        const requestPayload = EventValidator.validateGetNearby(req.query as Record<string, string>);
        const user = AuthValidator.validateAuth(req.user);
        const events = await this.eventService.getNearby(requestPayload, user);
        res.json({ events });
    })

    deleteById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        await this.eventService.deleteById(id);
        res.json(MessageResponsePayload.success('Event was deleted successfully!'));
    })

    addToFavorites = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = AuthValidator.validateAuth(req.user);
        await this.favoriteService.create({ eventId: id, memberId: user.id });
        res.json(MessageResponsePayload.success('Event was successfully added to favorites!'));
    })

    removeFromFavorites = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = AuthValidator.validateAuth(req.user);
        await this.favoriteService.delete({ eventId: id, memberId: user.id });
        res.json(MessageResponsePayload.success('Event was successfully removed from favorites'));
    })
}

export default EventController;