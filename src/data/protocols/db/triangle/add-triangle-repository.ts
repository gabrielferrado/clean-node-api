import { AddTriangleModel } from '../../../../domain/usecases/add-triangle'
import { TriangleModel } from '../../../../domain/models/triangle'

export interface AddTriangleRepository {
  add: (triangleData: AddTriangleModel) => Promise<TriangleModel>
}
