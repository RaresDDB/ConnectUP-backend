import { Router } from "express";
import { geocodingController } from "../controllers";

const router: Router = Router();

const {
    getCoordsByAddress
} = geocodingController;

router.get('/coords/:address', getCoordsByAddress);

export default router;
