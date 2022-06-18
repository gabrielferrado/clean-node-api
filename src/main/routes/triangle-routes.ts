import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  makeAddTriangleController
} from '../factories/controllers/triangle/add-triangle/add-triangle-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'
import {
  makeLoadTriangleController
} from '../factories/controllers/triangle/load-triangle/load-triangle-controller-factory'

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware())
  router.post('/triangles', authMiddleware, adaptRoute(makeAddTriangleController()))
  router.get('/triangles', authMiddleware, adaptRoute(makeLoadTriangleController()))
}
