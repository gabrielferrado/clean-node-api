import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const DEFAULT_VALUE = 'any_value'

describe('BCrypt Adapter', function () {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(DEFAULT_VALUE)
    expect(hashSpy).toHaveBeenCalledWith(DEFAULT_VALUE, salt)
  })
})
