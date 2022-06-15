import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
import { Collection } from 'mongodb'

const ACCOUNT_DATA = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
}
let accountCollection: Collection

describe('Account Mongo Repository', function () {
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

  test('Should return an account on add success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add(ACCOUNT_DATA)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(ACCOUNT_DATA.name)
    expect(account.email).toBe(ACCOUNT_DATA.email)
    expect(account.password).toBe(ACCOUNT_DATA.password)
  })

  test('Should return an account when search by email succeeds', async () => {
    const sut = new AccountMongoRepository()
    await accountCollection.insertOne(ACCOUNT_DATA)
    const account = await sut.loadByEmail(ACCOUNT_DATA.email)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(ACCOUNT_DATA.name)
    expect(account.email).toBe(ACCOUNT_DATA.email)
    expect(account.password).toBe(ACCOUNT_DATA.password)
  })
})
