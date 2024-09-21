import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
// .env 파일에서 환경 변수를 가져오기 위해 필요
dotenv.config();

// AWS 서비스들과 상호작용하기 위해 필요

// AWS 자격증명 .env파일에서 환경변수들을 갖고 온다.
const s3 = new S3Client({
    region : process.env.AWS_REGION, // 서울로 기입했으면 이거 기입
    credentials : {
        accessKeyId : process.env.S3_ACCESS_KEY,
        secretAccessKey : process.env.S3_SECRET_KEY
    }
})
const allowed = ['.png','.jpg','.jpeg']
export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read', 
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const filename = file.originalname;
            const extension = path.extname(file.originalname)
            if(!allowed.includes(extension)){
                return cb(new Error("error"))
            }
            const key = filename;
            cb(null, key);
        },
    }),
});

