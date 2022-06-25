import {
  AddTriangle,
  Controller,
  HttpRequest,
  HttpResponse,
  InvalidParamError,
  TriangleValidator,
  Validator
} from './add-triangle-controller-protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helpers'

export class AddTriangleController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly addTriangle: AddTriangle,
    private readonly triangleValidator: TriangleValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { side1, side2, side3 } = httpRequest.body

      const classifiedTriangle = this.triangleValidator.classify({ side1, side2, side3 })
      if (!classifiedTriangle) return badRequest(new InvalidParamError('sides'))

      const triangle = await this.addTriangle.add({ ...classifiedTriangle, date: new Date() })

      return ok(triangle)
    } catch (e) {
      return serverError(e)
    }
  }
}
