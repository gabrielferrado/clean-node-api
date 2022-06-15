import { Encryptor } from '../../../data/protocols/criptography/encryptor'
import { AccountModel } from '../../../domain/models/account'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encryptor {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (account: AccountModel): Promise<string> {
    jwt.sign(account, this.secret)
    return Promise.resolve('')
  }
}
