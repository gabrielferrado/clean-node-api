import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadTriangle
} from './load-triangle-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helpers'

export class LoadTriangleController implements Controller {
  constructor (
    private readonly loadTriangle: LoadTriangle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const triangles = await this.loadTriangle.load()

      return ok(triangles)
    } catch (e) {
      return serverError(e)
    }
  }
}
