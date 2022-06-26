import { SignUpController } from '@/presentation/controllers/auth/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidator(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
