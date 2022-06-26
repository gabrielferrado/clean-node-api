import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/auth/login/login-controller'
import { makeLoginValidator } from './login-validator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidator())
  return makeLogControllerDecorator(controller)
}
