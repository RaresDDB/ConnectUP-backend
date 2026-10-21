import asyncHandler from "express-async-handler"
import AuthValidator from "../../validators/auth-validator";
import ReviewService from "../../services/review-service";
import ReviewValidator from "../../validators/review-validator";
import { MessageResponsePayload } from "../../responses/message-response-payload";

class ReviewController {
    private reviewService: ReviewService;

    constructor(reviewService: ReviewService) {
        this.reviewService = reviewService;
    }

    create = asyncHandler(async (req, res) => {
        const user = AuthValidator.validateAuth(req.user);
        const requestPayload = ReviewValidator.validateCreate(req.body, user);
        const review = await this.reviewService.create(requestPayload);

        res.status(201).json({
            review,
            ...MessageResponsePayload.success('Review was created successfully!')
        });
    })
}

export default ReviewController;