import { MongoHelper as sut } from './mongo-helper'
import { hash } from 'bcrypt'

const ACCOUNT_DATA = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
}

describe('Mongo Helper', function () {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })

  test('Should return a object on mapping values', async () => {
    const accountCollection = await sut.getCollection('accounts')
    const password = await hash(ACCOUNT_DATA.password, 12)
    const account = await accountCollection.insertOne({ ...ACCOUNT_DATA, password })
    const result = await sut.map(account)
    expect(typeof result).toBe(typeof {})
  })
})
