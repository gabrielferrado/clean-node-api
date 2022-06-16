import { Encryptor } from '../../../data/protocols/criptography/encryptor'
import { AccountModel } from '../../../domain/models/account'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encryptor {
  constructor (private readonly secret: string) {}

  async encrypt (account: AccountModel): Promise<string> {
    return jwt.sign(account, this.secret)
  }
}
