import { AddTriangle, AddTriangleModel, AddTriangleRepository, TriangleModel } from './db-add-triangle-protocols'

export class DbAddTriangle implements AddTriangle {
  constructor (
    private readonly addTriangleRepository: AddTriangleRepository
  ) {}

  async add (data: AddTriangleModel): Promise<TriangleModel> {
    return this.addTriangleRepository.add(data)
  }
}
