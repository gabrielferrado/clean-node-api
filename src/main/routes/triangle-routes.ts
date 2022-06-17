import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  makeAddTriangleController
} from '../factories/controllers/triangle/add-triangle/add-triangle-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware())
  router.post('/triangles', authMiddleware, adaptRoute(makeAddTriangleController()))
}
