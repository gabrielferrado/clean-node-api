import { LoadTriangleRepository, TriangleModel, LoadTriangle } from './db-load-triangle-protocols'

export class DbLoadTriangle implements LoadTriangle {
  constructor (
    private readonly loadTriangleRepository: LoadTriangleRepository
  ) {}

  async load (): Promise<TriangleModel[]> {
    return this.loadTriangleRepository.loadAll()
  }
}
