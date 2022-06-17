import { AuthMiddleware } from './auth-middleware'
import { Middleware } from '../../protocols'
import { forbidden } from '../../helpers/http/http-helpers'
import { AccessDeniedError } from '../../errors'

const makeSut = (): Middleware => {
  return new AuthMiddleware()
}

describe('Auth Middleware', function () {
  test('Should return 403 if valid auth header is missing', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
