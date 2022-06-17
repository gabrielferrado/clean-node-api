import { AccountModel } from '../../../domain/models/account'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decryptor } from '../../protocols/criptography/decryptor'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

const VALID_ACCOUNT = {
  email: 'any_email',
  password: 'hashed_password',
  name: 'any_name',
  id: 'any_id'
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string): Promise<AccountModel> {
      return Promise.resolve(VALID_ACCOUNT)
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecryptor = (): Decryptor => {
  class DecryptorStub implements Decryptor {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }
  return new DecryptorStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  decryptorStub: Decryptor
}
const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const decryptorStub = makeDecryptor()
  const sut = new DbLoadAccountByToken(loadAccountByTokenRepositoryStub, decryptorStub)
  return {
    sut,
    loadAccountByTokenRepositoryStub,
    decryptorStub
  }
}

describe('DbLoadAccountByToken UseCase', function () {
  test('Should call decrypt with correct values', async () => {
    const { sut, decryptorStub } = makeSut()
    const decryptSpy = jest.spyOn(decryptorStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_value')
  })

  test('Should return null if Decryptor returns null', async () => {
    const { sut, decryptorStub } = makeSut()
    jest.spyOn(decryptorStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token')
    expect(account).toEqual(VALID_ACCOUNT)
  })
})
