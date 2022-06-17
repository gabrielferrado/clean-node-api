import { MongoHelper } from '../helpers/mongo-helper'
import { TriangleMongoRepository } from './triangle-mongo-repository'
import { Collection } from 'mongodb'
import * as mockdate from 'mockdate'
import { TriangleTypes } from '../../../../domain/models/triangle'

const VALID_TRIANGLE_SCALENE = {
  type: TriangleTypes.SCALENE,
  sides: [3,4,5],
  date: new Date()
}
const VALID_TRIANGLE_EQUILATERAL = {
  type: TriangleTypes.EQUILATERAL,
  sides: [3,3,3],
  date: new Date()
}

let triangleCollection: Collection

const makeSut = (): TriangleMongoRepository => {
  return new TriangleMongoRepository()
}

describe('Triangle Mongo Repository', function () {
  beforeAll(async () => {
    mockdate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    triangleCollection = await MongoHelper.getCollection('triangles')
    await triangleCollection.deleteMany({})
  })

  describe('add()' , function () {
    test('Should return an triangle on add success', async () => {
      const sut = makeSut()
      const triangle = await sut.add(VALID_TRIANGLE_EQUILATERAL)
      expect(triangle).toBeTruthy()
      expect(triangle.id).toBeTruthy()
      expect(triangle.type).toBe(VALID_TRIANGLE_EQUILATERAL.type)
      expect(triangle.sides).toEqual(VALID_TRIANGLE_EQUILATERAL.sides)
    })
  })

  describe('loadAll()' , function () {
    test('Should load all triangles on success', async () => {
      await triangleCollection.insertMany([VALID_TRIANGLE_SCALENE, VALID_TRIANGLE_EQUILATERAL])
      const sut = makeSut()
      const triangles = await sut.loadAll()
      expect(triangles.length).toBe(2)
      expect(triangles[0].type).toBe(TriangleTypes.SCALENE)
      expect(triangles[1].type).toBe(TriangleTypes.EQUILATERAL)
    })

    test('Should return an empty list if no registries', async () => {
      const sut = makeSut()
      const triangles = await sut.loadAll()
      expect(triangles.length).toBe(0)
    })
  })
})
