import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import imageSize from 'image-size'
import fs from 'fs'
import BadRequestError from '../errors/bad-request-error'


const MAX_FILE_SIZE = 10 * 1024 * 1024
const MIN_FILE_SIZE = 2 * 1024

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {



    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }

    if (req.file.size < MIN_FILE_SIZE) {
        return next(new BadRequestError('Файл слишком маленький'));
    }

    if (req.file.size > MAX_FILE_SIZE) {
        return next(new BadRequestError('Файл слишком большой'));
    }

    try {
        // читаем файл как Buffer
        const buffer = fs.readFileSync(req.file.path)
        const dimensions = imageSize(buffer) // теперь TypeScript согласен
        if (!dimensions.width || !dimensions.height) {
            return next(new BadRequestError('Некорректное изображение'))
        }
    } catch (err) {
        return next(new BadRequestError('Некорректное изображение'))
    }

    try {
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${req.file.filename}`
            : `/${req.file?.filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: req.file?.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
