import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import {
  AddTriangleController
} from '../../../../../presentation/controllers/triangle/add-triangle/add-triangle-controller'
import { makeAddTriangleValidator } from './add-triangle-validator-factory'
import { makeDbAddTriangle } from '../../../usecases/triangle/add-triangle/db-add-triangle-factory'
import { TriangleValidatorAdapter } from '../../../../../infra/validators/triangle-validator-adapter'

export const makeAddTriangleController = (): Controller => {
  const triangleValidatorAdapter = new TriangleValidatorAdapter()
  const controller = new AddTriangleController(makeAddTriangleValidator(), makeDbAddTriangle(), triangleValidatorAdapter)
  return makeLogControllerDecorator(controller)
}
