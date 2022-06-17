import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

const VALID_TRIANGLE = {
  side1: 1,
  side2: 1,
  side3: 1
}

let triangleCollection: Collection

describe('Triangle Routes', function () {
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

  describe('POST /triangles', () => {
    test('Should return 200 on add triangle success', async () => {
      await request(app)
        .post('/api/triangles')
        .send(VALID_TRIANGLE)
        .expect(200)
    })
  })
})
