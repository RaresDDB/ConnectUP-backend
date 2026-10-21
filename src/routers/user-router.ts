import { Router } from "express";
import { userController } from "../controllers";
import { uploadMiddleware } from "../middlewares/upload-middleware";

const router: Router = Router();

const {
    updateById
} = userController;

router.put('/:id', uploadMiddleware.single('avatar'), updateById);

export default router;