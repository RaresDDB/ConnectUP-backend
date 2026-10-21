import { Router } from "express";
import { paymentController } from "../controllers";

const router: Router = Router();

const {
    create
} = paymentController;

router.post('/', create);

export default router;