import { HttpRequest, HttpResponse, Controller, Validator } from './signup-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helpers'
import { AddAccount } from '../../../domain/usecases/add-account'
import { Authenticator } from '../../../domain/usecases/authenticator'
import { EmailInUseError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validator: Validator,
    private readonly authenticator: Authenticator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) return forbidden(new EmailInUseError())
      const accessToken = await this.authenticator.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (e) {
      return serverError(e)
    }
  }
}
