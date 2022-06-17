import { AddTriangleRepository } from '../../../../data/protocols/db/triangle/add-triangle-repository'
import { AddTriangleModel } from '../../../../domain/usecases/add-triangle'
import { TriangleModel } from '../../../../domain/models/triangle'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadTriangleRepository } from '../../../../data/protocols/db/triangle/load-triangle-repository'

export class TriangleMongoRepository implements AddTriangleRepository, LoadTriangleRepository {
  async add (triangleData: AddTriangleModel): Promise<TriangleModel> {
    const triangleCollection = await MongoHelper.getCollection('triangles')
    const result = await triangleCollection.insertOne(triangleData)
    const triangle = await triangleCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map({ ...triangle })
  }

  async loadAll (): Promise<TriangleModel[]> {
    const triangleCollection = await MongoHelper.getCollection('triangles')
    return (await triangleCollection.find().toArray() as unknown) as TriangleModel[]
  }
}
