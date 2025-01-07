import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const IMAGE_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const imageFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files (jpg, jpeg, png, gif) are allowed!'),
      false
    );
  }
  
  if (!IMAGE_FILE_TYPES.includes(file.mimetype)) {
    return callback(
      new BadRequestException('Invalid file type. Only images are allowed!'),
      false
    );
  }
  
  callback(null, true);
};

export const imageUploadOptions: MulterOptions = {
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
};

export const ImageUploadInterceptor = () => {
  return FileInterceptor('image', imageUploadOptions);
};