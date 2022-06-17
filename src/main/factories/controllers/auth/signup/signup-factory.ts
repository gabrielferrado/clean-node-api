import { SignUpController } from '../../../../../presentation/controllers/auth/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidator(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
