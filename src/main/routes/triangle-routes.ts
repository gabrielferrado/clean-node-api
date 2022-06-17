import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import {
  makeAddTriangleController
} from '../factories/controllers/triangle/add-triangle/add-triangle-controller-factory'

export default (router: Router): void => {
  router.post('/triangles', adaptRoute(makeAddTriangleController()))
}
