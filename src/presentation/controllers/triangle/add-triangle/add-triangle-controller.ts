import { AddTriangle, Controller, HttpRequest, HttpResponse, Validator } from './add-triangle-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helpers'

export class AddTriangleController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly addTriangle: AddTriangle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { side1, side2, side3 } = httpRequest.body
      const triangle = await this.addTriangle.add({ side1, side2, side3 })

      return ok(triangle)
    } catch (e) {
      return serverError(e)
    }
  }
}
