import { MongoHelper } from '../helpers/mongo-helper'
import { TriangleMongoRepository } from './triangle-mongo-repository'
import { Collection } from 'mongodb'
import { TriangleTypes } from '../../../../domain/usecases/add-triangle'

const VALID_TRIANGLE = {
  type: TriangleTypes.SCALENE,
  sides: [3,4,5]
}

let triangleCollection: Collection

describe('Triangle Mongo Repository', function () {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    triangleCollection = await MongoHelper.getCollection('triangles')
    await triangleCollection.deleteMany({})
  })

  test('Should return an triangle on add success', async () => {
    const sut = new TriangleMongoRepository()
    const triangle = await sut.add(VALID_TRIANGLE)
    expect(triangle).toBeTruthy()
    expect(triangle.id).toBeTruthy()
    expect(triangle.type).toBe(VALID_TRIANGLE.type)
    expect(triangle.sides).toEqual(VALID_TRIANGLE.sides)
  })
})
