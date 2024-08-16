import { Router } from 'express';
import { uploadImage } from '../controllers/imageUploadController';

const router = Router();

router.post('/upload', uploadImage); // Route for handling file uploads

export default router;
