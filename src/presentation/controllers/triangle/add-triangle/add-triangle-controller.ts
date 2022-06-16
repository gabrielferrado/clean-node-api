import { AddTriangle, Controller, HttpRequest, HttpResponse, Validator } from './add-triangle-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

export class AddTriangleController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly addTriangle: AddTriangle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validator.validate(httpRequest.body)
    if (error) return badRequest(error)

    const { side1, side2, side3 } = httpRequest.body

    await this.addTriangle.add({ side1, side2, side3 })

    return null
  }
}
