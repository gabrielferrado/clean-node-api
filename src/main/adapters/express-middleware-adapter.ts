import { HttpRequest, Middleware } from '../../presentation/protocols'
import { NextFunction, Request, Response } from 'express'

interface CustomRequest extends Request {
  accountId?: string
}

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
