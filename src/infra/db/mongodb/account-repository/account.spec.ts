import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const ACCOUNT_DATA = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
}

describe('Account Mongo Repository', function () {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add(ACCOUNT_DATA)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(ACCOUNT_DATA.name)
    expect(account.email).toBe(ACCOUNT_DATA.email)
    expect(account.password).toBe(ACCOUNT_DATA.password)
  })
})
