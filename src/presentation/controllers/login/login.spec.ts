import { LoginController } from './login'
import { EmailValidator, Authenticator } from './login-protocols'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'

const DEFAULT_HTTP_REQUEST = {
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticator = (): Authenticator => {
  class AuthenticatorStub implements Authenticator {
    async auth (email: string, password: string): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new AuthenticatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticatorStub: Authenticator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const authenticatorStub = makeAuthenticator()
  const sut = new LoginController(emailValidatorStub, authenticatorStub)
  return {
    sut,
    emailValidatorStub,
    authenticatorStub
  }
}

describe('Login Controller', function () {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if Authenticator throws', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call authentication with correct values', async () => {
    const { sut, authenticatorStub } = makeSut()
    const authSpy = jest.spyOn(authenticatorStub, 'auth')
    await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticatorStub } = makeSut()
    jest.spyOn(authenticatorStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(DEFAULT_HTTP_REQUEST)
    expect(httpResponse).toEqual(unauthorized())
  })
})
