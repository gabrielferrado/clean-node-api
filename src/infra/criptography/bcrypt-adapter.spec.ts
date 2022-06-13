import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

const DEFAULT_VALUE = 'any_value'
const SALT = 12

const makeSut = (): BCryptAdapter => {
  return new BCryptAdapter(SALT)
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('BCrypt Adapter', function () {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt(DEFAULT_VALUE)
    expect(hashSpy).toHaveBeenCalledWith(DEFAULT_VALUE, SALT)
  })

  test('Should a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt(DEFAULT_VALUE)
    expect(hash).toBe('hash')
  })
})
