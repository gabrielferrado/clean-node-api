import { Authenticator, AuthenticatorModel } from '../../../domain/usecases/authenticator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements Authenticator {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticatorModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
