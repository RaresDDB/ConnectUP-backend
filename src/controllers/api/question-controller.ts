import asyncHandler from "express-async-handler"
import AuthValidator from "../../validators/auth-validator";
import QuestionService from "../../services/question-service";
import QuestionValidator from "../../validators/question-validator";
import { MessageResponsePayload } from "../../responses/message-response-payload";

class QuestionController {
    private questionService: QuestionService;

    constructor(questionService: QuestionService) {
        this.questionService = questionService;
    }

    create = asyncHandler(async (req, res) => {
        const user = AuthValidator.validateAuth(req.user);
        const requestPayload = QuestionValidator.validateCreate(req.body, user);
        const question = await this.questionService.create(requestPayload);

        res.status(201).json({
            question,
            ...MessageResponsePayload.success('Question was created successfully!')
        });
    })
}

export default QuestionController;