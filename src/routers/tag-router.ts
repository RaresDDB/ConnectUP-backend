import { Router } from "express";
import { tagController } from "../controllers";

const router: Router = Router();

const {
    getAll
} = tagController;

router.get('/', getAll);

export default router;