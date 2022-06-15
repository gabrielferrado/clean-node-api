import { HttpRequest, HttpResponse, Controller, Validator } from './signup-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { AddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validator: Validator

  constructor (addAccount: AddAccount, validator: Validator) {
    this.addAccount = addAccount
    this.validator = validator
  }

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

      return ok(account)
    } catch (e) {
      return serverError(e)
    }
  }
}
