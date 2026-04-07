import { diskStorage } from "multer";
import * as path from 'path';
import * as fs from 'fs';
import { fileNamer } from "./file-namer.helper";

export const saveImageWithUserIdHelper = diskStorage({
  destination: (req, file, callback) => {
    const user = req.user as any;
    if(!user) {
      return callback(new Error('User missing in request'), '');
    }
    const userId = user.id;
    const uploadPath = path.join(__dirname, '../../../../../static/user/', userId, 'avatar');

    if(!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },

  filename: fileNamer
})