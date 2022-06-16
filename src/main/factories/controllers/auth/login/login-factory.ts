import { Controller } from '../../../../../presentation/protocols'
import { LoginController } from '../../../../../presentation/controllers/auth/login/login-controller'
import { makeLoginValidator } from './login-validator-factory'
import { makeDbAuthentication } from '../../../usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidator())
  return makeLogControllerDecorator(controller)
}
