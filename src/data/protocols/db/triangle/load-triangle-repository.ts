import { TriangleModel } from '../../../../domain/models/triangle'

export interface LoadTriangleRepository {
  loadAll: () => Promise<TriangleModel[]>
}
