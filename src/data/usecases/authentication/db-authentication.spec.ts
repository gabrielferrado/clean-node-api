import { Authenticator } from '../../../domain/usecases/authenticator'
import { DbAuthentication } from './db-authentication'
import { AccountModel } from '../../../domain/models/account'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { HashComparer } from '../../protocols/criptography/hash-comparer'

const VALID_AUTH = {
  email: 'any_email@mail.com',
  password: 'any_password'
}
const VALID_ACCOUNT = {
  email: 'any_email',
  password: 'hashed_password',
  name: 'any_name',
  id: 'any_id'
}

interface SutTypes {
  sut: Authenticator
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
}

const makeLoadAccountStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return Promise.resolve(VALID_ACCOUNT)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountStub()
  const hashComparerStub = makeHashComparerStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub
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

  test('Should return null if LoadAccountByEmailRepository could not find an account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(VALID_AUTH)
    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(VALID_AUTH)
    expect(compareSpy).toHaveBeenCalledWith(VALID_AUTH.password, VALID_ACCOUNT.password)
  })
})
