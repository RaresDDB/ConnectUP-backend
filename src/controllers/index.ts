import TagController from "./api/tag-controller";
import UserController from "./api/user-controller";
import AuthController from "./auth/auth-controller";
import EventController from "./api/event-controller";
import MemberController from "./api/member-controller";
import ReviewController from "./api/review-controller";
import PaymentController from "./api/payment-controller";
import QuestionController from "./api/question-controller";
import GeocodingController from "./api/geocoding-controller";
import GeneratorController from "./api/generator-controller";
import {
    tagService,
    authService,
    userService,
    eventService,
    memberService,
    reviewService,
    favoriteService,
    questionService,
    generatorService,
    geocodingService,
    eventAttendeeService,
} from "../services";

export const tagController: TagController = new TagController(tagService);

export const userController: UserController = new UserController(userService);

export const authController: AuthController = new AuthController(authService);

export const eventController: EventController = new EventController(
    eventService,
    favoriteService,
    eventAttendeeService
);

export const memberController: MemberController = new MemberController(memberService);

export const reviewController: ReviewController = new ReviewController(reviewService);

export const paymentController: PaymentController = new PaymentController();

export const questionController: QuestionController = new QuestionController(questionService);

export const geocodingController: GeocodingController = new GeocodingController(geocodingService);

export const generatorController: GeneratorController = new GeneratorController(generatorService);