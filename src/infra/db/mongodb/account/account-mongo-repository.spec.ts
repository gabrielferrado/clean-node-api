import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { Collection } from 'mongodb'
import { AccountModel } from '@/domain/models/account'

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

  const validateAccount = (account: AccountModel): void => {
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(ACCOUNT_DATA.name)
    expect(account.email).toBe(ACCOUNT_DATA.email)
    expect(account.password).toBe(ACCOUNT_DATA.password)
  }

  describe('add()', function () {
    test('Should return an account on add success', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.add(ACCOUNT_DATA)
      validateAccount(account)
    })
  })

  describe('loadByEmail()', function () {
    test('Should return an account when search by email succeeds', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne(ACCOUNT_DATA)
      const account = await sut.loadByEmail(ACCOUNT_DATA.email)
      validateAccount(account)
    })

    test('Should return null when search by email fails', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.loadByEmail(ACCOUNT_DATA.email)
      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', function () {
    test('Should update the account token with success', async () => {
      const sut = new AccountMongoRepository()
      const res = await accountCollection.insertOne(ACCOUNT_DATA)
      await sut.updateAccessToken(res.insertedId.toString(), 'any_token')
      const account = await accountCollection.findOne({ _id: res.insertedId })
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', function () {
    test('Should return an account when loadByToken succeeds', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({ accessToken: 'any_token', ...ACCOUNT_DATA })
      const account = await sut.loadByToken('any_token')
      validateAccount(account)
    })

    test('Should return null when loadByToken fails', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.loadByEmail(ACCOUNT_DATA.email)
      expect(account).toBeNull()
    })
  })
})
