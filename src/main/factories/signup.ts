import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BCryptAdapter(12)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccountAdapter = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccountAdapter)
  return new LogControllerDecorator(signUpController)
}
