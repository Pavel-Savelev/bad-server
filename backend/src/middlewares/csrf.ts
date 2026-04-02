import crypto from 'crypto'
import { Request, Response, NextFunction } from 'express'

export const generateCsrfToken = (_req: Request, res: Response) => {
    const token = crypto.randomBytes(32).toString('hex')

    res.cookie('csrfToken', token, {
        httpOnly: false, // нужно чтобы фронт мог прочитать
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    })

    res.json({ csrfToken: token })
}

export const verifyCsrfToken = (req: Request, res: Response, next: NextFunction) => {
    const tokenFromHeader = req.headers['x-csrf-token']
    const tokenFromCookie = req.cookies.csrfToken

    if (!tokenFromHeader || tokenFromHeader !== tokenFromCookie) {
        return res.status(403).json({ message: 'Invalid CSRF token' })
    }

    next()
}
