import { LoadTriangle } from '../../../domain/usecases/load-triangle'
import { TriangleModel } from '../../../domain/models/triangle'
import { LoadTriangleRepository } from '../../protocols/db/triangle/load-triangle-repository'

export class DbLoadTriangle implements LoadTriangle {
  constructor (
    private readonly loadTriangleRepository: LoadTriangleRepository
  ) {}

  async load (): Promise<TriangleModel[]> {
    await this.loadTriangleRepository.loadAll()
    return Promise.resolve([])
  }
}
