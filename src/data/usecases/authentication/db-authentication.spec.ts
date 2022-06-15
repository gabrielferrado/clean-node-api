import { Authenticator } from '../../../domain/usecases/authenticator'
import { DbAuthentication } from './db-authentication'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

const VALID_AUTH = {
  email: 'any_email@mail.com',
  password: 'any_password'
}
const VALID_ACCOUNT = {
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
  id: 'any_id'
}

interface SutTypes {
  sut: Authenticator
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return Promise.resolve(VALID_ACCOUNT)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication use case', function () {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(VALID_AUTH)
    expect(loadSpy).toHaveBeenCalledWith(VALID_AUTH.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.auth(VALID_AUTH)
    await expect(promise).rejects.toThrow()
  })
})
