import { Encryptor } from '../../../data/protocols/criptography/encryptor'
import jwt from 'jsonwebtoken'
import { Decryptor } from '../../../data/protocols/criptography/decryptor'

export class JwtAdapter implements Encryptor, Decryptor {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return Promise.resolve('')
  }
}
