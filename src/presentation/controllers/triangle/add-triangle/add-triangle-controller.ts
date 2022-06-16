import { Controller, HttpRequest, HttpResponse, Validator } from './add-triangle-controller-protocols'

export class AddTriangleController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)
    return Promise.resolve(undefined)
  }
}
