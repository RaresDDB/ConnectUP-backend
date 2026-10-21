import authMiddleware from "../middlewares/auth-middleware";
import { Router } from "express";
import { questionController } from "../controllers";

const router: Router = Router();

const {
    create
} = questionController;

router.post('/', authMiddleware, create);

export default router;