import { Router } from 'express'
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import {
  makeAddTriangleController
} from '@/main/factories/controllers/triangle/add-triangle/add-triangle-controller-factory'
import {
  makeLoadTriangleController
} from '@/main/factories/controllers/triangle/load-triangle/load-triangle-controller-factory'

export default (router: Router): void => {
  const authMiddleware = adaptMiddleware(makeAuthMiddleware())
  router.post('/triangles', authMiddleware, adaptRoute(makeAddTriangleController()))
  router.get('/triangles', authMiddleware, adaptRoute(makeLoadTriangleController()))
}
