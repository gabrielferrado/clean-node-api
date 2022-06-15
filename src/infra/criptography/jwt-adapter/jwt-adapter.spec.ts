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

describe('JWT Adapter', function () {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(VALID_ACCOUNT)
    expect(signSpy).toHaveBeenCalledWith(VALID_ACCOUNT , 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt(VALID_ACCOUNT)
    expect(accessToken).toBe('any_token')
  })
})
