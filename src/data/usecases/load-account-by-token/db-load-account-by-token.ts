import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../../domain/models/account'
import { Decryptor } from '../../protocols/criptography/decryptor'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly loadAccountByToken: LoadAccountByTokenRepository,
    private readonly decryptor: Decryptor
  ) {}

  async load (accessToken: string): Promise<AccountModel> {
    const token = await this.decryptor.decrypt(accessToken)
    if (token) {
      await this.loadAccountByToken.loadByToken(token)
    }
    return Promise.resolve(null)
  }
}
