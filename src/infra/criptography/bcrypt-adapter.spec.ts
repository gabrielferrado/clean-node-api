import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const DEFAULT_VALUE = 'any_value'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('BCrypt Adapter', function () {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(DEFAULT_VALUE)
    expect(hashSpy).toHaveBeenCalledWith(DEFAULT_VALUE, salt)
  })

  test('Should a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt(DEFAULT_VALUE)
    expect(hash).toBe('hash')
  })
})
