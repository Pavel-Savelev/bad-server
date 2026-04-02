import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import { generateCsrfToken, verifyCsrfToken } from '../middlewares/csrf'

const authRouter = Router()

authRouter.get('/csrf-token', generateCsrfToken)

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, verifyCsrfToken, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', login)
// authRouter.post('/login', login)
authRouter.get('/token', refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', verifyCsrfToken, register)
// authRouter.post('/register', register)

export default authRouter
