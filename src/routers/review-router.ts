import authMiddleware from "../middlewares/auth-middleware";
import { Router } from "express";
import { reviewController } from "../controllers";

const router: Router = Router();

const {
    create
} = reviewController;

router.post('/', authMiddleware, create);

export default router;