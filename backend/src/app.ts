import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import path from 'path'
import { errors } from 'celebrate'
import { DB_ADDRESS } from './config'
import routes from './routes'
import serveStatic from './middlewares/serverStatic'
import errorHandler from './middlewares/error-handler'

const { PORT = 3000 } = process.env
const app = express()

// Body parsers
app.use(cookieParser('super-secret-key'))
app.use(cors({
  origin: process.env.ORIGIN_ALLOW,
  credentials: true
}))
app.use(json())
app.use(urlencoded({ extended: true }))

// const limiter = rateLimit({
//   windowMs: 10 * 1000,
//   max: 5,
//   keyGenerator: (req) => req.ip || '',
//   standardHeaders: true,
//   legacyHeaders: false,
//   message: 'Слишком много запросов, повторите позже',
// })

// app.use(limiter)

app.use(serveStatic(path.join(__dirname, 'public')))

app.use(routes)
app.use(errors())
app.use(errorHandler)

const bootstrap = async () => {
  try {
    await mongoose.connect(DB_ADDRESS)
    await app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    )
  } catch (error) {
    console.error(error)
  }
}

bootstrap()
