import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let triangleCollection: Collection
let accountCollection: Collection

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
const VALID_TRIANGLE = {
  side1: 1,
  side2: 1,
  side3: 1
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
})
