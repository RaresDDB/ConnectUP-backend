import authMiddleware from "../middlewares/auth-middleware";
import { Router } from "express";
import { authController } from "../controllers";
import { uploadMiddleware } from "../middlewares/upload-middleware";

const router: Router = Router();

const {
    register,
    activate,
    login,
    user,
    logout,
    forgotPassword,
    resetPassword,
    changeEmail,
    changePassword,
    confirmChangeEmail,
    confirmChangePassword
} = authController;

router.post("/register", uploadMiddleware.single('avatar'), register);
router.post("/activate", activate);
router.post("/login", login);
router.get("/user", authMiddleware, user);
router.post("/logout", authMiddleware, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-email", authMiddleware, changeEmail);
router.post("/change-password", authMiddleware, changePassword);
router.post("/confirm-change-email", authMiddleware, confirmChangeEmail);
router.post("/confirm-change-password", authMiddleware, confirmChangePassword);

export default router;