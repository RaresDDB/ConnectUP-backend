import fs from 'fs';
import path from 'path';
import multer from 'multer';

const createStorage = (folderName: string) => {
    const uploadPath = `public/uploads/${folderName}`;

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, `${crypto.randomUUID()}${extension}`);
        }
    });
};

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Invalid file type'));
        return;
    }

    cb(null, true);
};

export const uploadMiddleware = multer({
    storage: multer.diskStorage({
        destination: (_req, file, cb) => {
            let folder;
            switch (file.fieldname) {
                case 'image':
                    folder = 'images';
                    break;
                case 'gallery':
                    folder = 'gallery';
                    break;
                case 'avatar':
                    folder = 'avatars';
                    break;
                default:
                    folder = 'misc'; // Optional fallback folder
            }
            cb(null, `public/uploads/${folder}`);
        },
        filename: (_req, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, `${crypto.randomUUID()}${extension}`);
        }
    }),
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

createStorage('images');
createStorage('gallery');
createStorage('avatars');