import path from 'path'; //para que a definição de caminhos funcione em qualquer SO
import crypto from 'crypto';
import multer from 'multer';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp'),
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};