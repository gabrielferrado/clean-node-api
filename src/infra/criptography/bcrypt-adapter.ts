import { Encryptor } from '../../data/protocols/encryptor'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encryptor {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
