import UserService from "../../services/user-service";
import asyncHandler from "express-async-handler"
import UserValidator from "../../validators/user-validator";
import { MessageResponsePayload } from "../../responses/message-response-payload";

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    updateById = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const requestPayload = UserValidator.validateUpdateById(req.body, req.file);
        const user = await this.userService.updateById(id, requestPayload);
        res.json({
            ...MessageResponsePayload.success("You have successfully updated your profile"),
            user: user
        });
    })
}

export default UserController;