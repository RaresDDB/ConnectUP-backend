import { Router } from "express";
import { generatorController } from "../controllers";

const router: Router = Router();

const {
    generateAll,
    generateTags,
    generateAdmins
} = generatorController;

router.post('/', generateAll);
router.post('/tags', generateTags);
router.post('/admins', generateAdmins);

export default router;
