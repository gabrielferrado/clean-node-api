import { AuthMiddleware } from './auth-middleware'
import { Middleware } from '../../protocols'
import { forbidden } from '../../helpers/http/http-helpers'
import { AccessDeniedError } from '../../errors'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'

const VALID_ACCOUNT = {
  email: 'any_email',
  password: 'hashed_password',
  name: 'any_name',
  id: 'any_id'
}

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (token: string): Promise<AccountModel> {
      return Promise.resolve(VALID_ACCOUNT)
    }
  }
  return new LoadAccountByTokenStub()
}
interface SutTypes {
  sut: Middleware
  loadAccountByTokenStub: LoadAccountByToken
}
const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', function () {
  test('Should return 403 if valid auth header is missing', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
