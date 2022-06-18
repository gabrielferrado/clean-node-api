import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import {
  LoadTriangleController
} from '../../../../../presentation/controllers/triangle/load-triangle/load-triangle-controller'
import { makeDbLoadTriangle } from '../../../usecases/triangle/load-triangle/db-load-triangle-factory'

export const makeLoadTriangleController = (): Controller => {
  const controller = new LoadTriangleController(makeDbLoadTriangle())
  return makeLogControllerDecorator(controller)
}
