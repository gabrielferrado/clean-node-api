import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '../../../../../domain/usecases/add-account'
import { BCryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BCryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
