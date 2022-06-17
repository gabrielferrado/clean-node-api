import {
  AddTriangle,
  Controller,
  HttpRequest,
  HttpResponse,
  Validator
} from './add-triangle-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helpers'
import { TriangleValidator } from '../../../../validation/protocols/triangle-validator'
import { InvalidParamError } from '../../../errors'

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

      const triangle = await this.addTriangle.add(classifiedTriangle)

      return ok(triangle)
    } catch (e) {
      return serverError(e)
    }
  }
}
