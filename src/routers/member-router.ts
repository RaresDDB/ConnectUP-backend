import { Router } from "express";
import { memberController } from "../controllers";

const router: Router = Router();

const {
    getAll
} = memberController;

router.get('/', getAll);

export default router;