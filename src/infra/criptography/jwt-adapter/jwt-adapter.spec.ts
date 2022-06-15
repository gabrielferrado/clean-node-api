import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const VALID_ACCOUNT = {
  email: 'any_email',
  password: 'hashed_password',
  name: 'any_name',
  id: 'any_id'
}

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', function () {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(VALID_ACCOUNT)
    expect(signSpy).toHaveBeenCalledWith(VALID_ACCOUNT , 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt(VALID_ACCOUNT)
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(
      () => { throw new Error() }
    )
    const promise = sut.encrypt(VALID_ACCOUNT)
    await expect(promise).rejects.toThrow()
  })
})
