import { SignUpController } from './signup-controller'
import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  HttpRequest,
  Validator,
  MissingParamError, ServerError, EmailInUseError
} from './signup-controller-protocols'
import { Authenticator, AuthenticatorModel } from '@/domain/usecases/authenticator'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helpers'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validatorStub: Validator
  authenticatorStub: Authenticator
}

const VALID_BODY = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
}
const VALID_HTTP_REQUEST: HttpRequest = {
  body: VALID_BODY
}
const VALID_FAKE_ACCOUNT: AccountModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(VALID_FAKE_ACCOUNT))
    }
  }
  return new AddAccountStub()
}
const makeAuthenticator = (): Authenticator => {
  class AuthenticatorStub implements Authenticator {
    async auth (authentication: AuthenticatorModel): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new AuthenticatorStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validatorStub = makeValidator()
  const authenticatorStub = makeAuthenticator()

  const sut = new SignUpController(addAccountStub, validatorStub, authenticatorStub)
  return {
    sut,
    addAccountStub,
    validatorStub,
    authenticatorStub
  }
}

describe('SignUp Controller', function () {
  test('Should return 400 if Validator returns an error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(validateSpy).toHaveBeenCalledWith(VALID_BODY)
  })

  test('Should return 500 if add account throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 403 if email is already on use', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticatorStub } = makeSut()
    const authSpy = jest.spyOn(authenticatorStub, 'auth')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
