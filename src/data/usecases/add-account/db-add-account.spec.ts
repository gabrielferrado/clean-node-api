import { DbAddAccount } from './db-add-account'
import { Encryptor } from '../../protocols/encryptor'

interface SutTypes {
  sut: DbAddAccount
  encryptorStub: Encryptor
}

const makeEncryptor = (): Encryptor => {
  class EncryptorStub {
    async encrypt (value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncryptorStub()
}

const makeSut = (): SutTypes => {
  const encryptorStub = makeEncryptor()
  const sut = new DbAddAccount(encryptorStub)
  return {
    sut,
    encryptorStub
  }
}

describe('DbAddAccount UseCase', function () {
  test('Should call Encryptor with correct password', async () => {
    const { sut, encryptorStub } = makeSut()
    const encryptSpy = jest.spyOn(encryptorStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
