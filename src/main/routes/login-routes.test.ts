import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'

const VALID_ACCOUNT = {
  name: 'Gabriel',
  email: 'gabriel.ferreira@mail.com',
  password: '123',
  passwordConfirmation: '123'
}

let accountCollection: Collection

describe('Login Routes', function () {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send(VALID_ACCOUNT)
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash(VALID_ACCOUNT.password, 12)
      await accountCollection.insertOne({ ...VALID_ACCOUNT, password })
      await request(app)
        .post('/api/login')
        .send({
          email: VALID_ACCOUNT.email,
          password: VALID_ACCOUNT.password
        })
        .expect(200)
    })

    test('Should return 401 if login fails', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: VALID_ACCOUNT.email,
          password: VALID_ACCOUNT.password
        })
        .expect(401)
    })
  })
})
