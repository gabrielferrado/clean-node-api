import { Controller, HttpRequest, HttpResponse, Validator } from './add-triangle-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

export class AddTriangleController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    if (error) return badRequest(error)
    return Promise.resolve(undefined)
  }
}
