import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'
import { TriangleTypes } from '@/domain/models/triangle'

let triangleCollection: Collection
let accountCollection: Collection
const VALID_TRIANGLE = {
  side1: 1,
  side2: 1,
  side3: 1
}
const VALID_TRIANGLE_SCALENE = {
  type: TriangleTypes.SCALENE,
  sides: [3,4,5],
  date: new Date()
}

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Gabriel',
    email: 'gabrie.ferreira@gmail.com',
    password: '123'
  })
  const id = res.insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await triangleCollection.deleteMany({})
  })

  describe('POST /triangles', () => {
    test('Should return 403 if not authorized', async () => {
      await request(app)
        .post('/api/triangles')
        .send(VALID_TRIANGLE)
        .expect(403)
    })

    test('Should return 200 if valid token is provided', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/triangles')
        .set('x-access-token', accessToken)
        .send(VALID_TRIANGLE)
        .expect(200)
    })
  })

  describe('GET /triangles', () => {
    test('Should return 403 if not authorized', async () => {
      await request(app)
        .get('/api/triangles')
        .expect(403)
    })

    test('Should return 200 if valid token is provided', async () => {
      const accessToken = await mockAccessToken()
      await triangleCollection.insertOne(VALID_TRIANGLE_SCALENE)
      await request(app)
        .get('/api/triangles')
        .set('x-access-token', accessToken)
        .expect(200)
    })

    test('Should return 204 if valid token is provided and no registries were found', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/triangles')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
