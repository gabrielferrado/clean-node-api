import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { Authenticator, Controller, HttpRequest, HttpResponse, Validator } from './login-protocols'

export class LoginController implements Controller {
  private readonly authenticator: Authenticator
  private readonly validator: Validator

  constructor (authenticator: Authenticator, validator: Validator) {
    this.authenticator = authenticator
    this.validator = validator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { email, password } = httpRequest.body

      const token = await this.authenticator.auth(email, password)

      if (!token) return unauthorized()

      return ok({ accessToken: token })
    } catch (e) {
      return serverError(e)
    }
  }
}
