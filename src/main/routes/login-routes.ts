import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/controllers/auth/signup/signup-factory'
import { makeLoginController } from '@/main/factories/controllers/auth/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
