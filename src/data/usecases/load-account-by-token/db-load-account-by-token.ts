import {
  AccountModel,
  LoadAccountByTokenRepository,
  Decryptor,
  LoadAccountByToken
} from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly loadAccountByToken: LoadAccountByTokenRepository,
    private readonly decryptor: Decryptor
  ) {}

  async load (accessToken: string): Promise<AccountModel> {
    const token = await this.decryptor.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByToken.loadByToken(accessToken)
      if (account) return account
    }
    return Promise.resolve(null)
  }
}
