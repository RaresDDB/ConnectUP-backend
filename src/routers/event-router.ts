import authMiddleware from "../middlewares/auth-middleware";
import { Router } from "express";
import { eventController } from "../controllers";
import { uploadMiddleware } from "../middlewares/upload-middleware";

const router: Router = Router();

const {
    getAll,
    create,
    attend,
    getById,
    unattend,
    getNearby,
    deleteById,
    addToFavorites,
    removeFromFavorites
} = eventController;

const fields = [
    { name: 'image', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
];

router.get('/', authMiddleware, getAll);
router.post('/', [authMiddleware, uploadMiddleware.fields(fields)], create);
router.get('/nearby', authMiddleware, getNearby);
router.post('/:id/attend', authMiddleware, attend);
router.delete('/:id/attend', authMiddleware, unattend);
router.post('/:id/favorites', authMiddleware, addToFavorites);
router.delete('/:id/favorites', authMiddleware, removeFromFavorites);
router.get('/:id', getById);
router.delete('/:id', authMiddleware, deleteById);

export default router;
