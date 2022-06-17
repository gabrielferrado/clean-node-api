import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadTriangle
} from './load-triangle-controller-protocols'
import { noContent, ok, serverError } from '../../../helpers/http/http-helpers'

export class LoadTriangleController implements Controller {
  constructor (
    private readonly loadTriangle: LoadTriangle
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const triangles = await this.loadTriangle.load()
      return triangles.length ? ok(triangles) : noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}
