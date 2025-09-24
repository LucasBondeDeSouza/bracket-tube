import "dotenv/config"
import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"

// Pegando variáveis de ambiente
const { S3_ACCESS_KEY, S3_SECRET_KEY, BUCKET } = process.env

// Configurando cliente S3
const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
    },
})

// Função para criar middleware de upload
export const uploadImage = () => {
  return multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        acl: "public-read", // arquivo público
        contentType: multerS3.AUTO_CONTENT_TYPE, // detecta o tipo automaticamente
        key: function (req, file, cb) {
            // Gera o nome do arquivo com timestamp e extensão original
            const extension = file.originalname.split(".").pop()
            cb(null, `${Date.now()}.${extension}`)
        },
    }),
  })
}