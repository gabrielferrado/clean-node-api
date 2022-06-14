import { badRequest, serverError, unauthorized } from '../../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator, Authenticator, Controller, HttpRequest, HttpResponse } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authenticator: Authenticator

  constructor (emailValidator: EmailValidator, authenticator: Authenticator) {
    this.emailValidator = emailValidator
    this.authenticator = authenticator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const token = await this.authenticator.auth(email, password)

      if (!token) return unauthorized()
    } catch (e) {
      return serverError(e)
    }
  }
}
