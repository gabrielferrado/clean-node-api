import env from '../../../config/env'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authenticator } from '../../../../domain/usecases/authenticator'
import { BCryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAuthentication = (): Authenticator => {
  const bcryptAdapter = new BCryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
