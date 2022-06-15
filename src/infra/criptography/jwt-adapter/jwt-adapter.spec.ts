import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

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
})
