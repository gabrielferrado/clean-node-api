import { Controller, HttpRequest, HttpResponse } from '../../../presentation/protocols'
import { LogErrorRepository } from '../../../data/protocols/db/log/log-error-repository'
import { constants } from 'http2'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
