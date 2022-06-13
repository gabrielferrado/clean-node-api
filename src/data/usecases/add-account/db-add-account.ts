import { AddAccount, AddAccountModel, AccountModel, Encryptor, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryptor: Encryptor
  private readonly addAccountRepository: AddAccountRepository
  constructor (encryptor: Encryptor, addAccountRepository: AddAccountRepository) {
    this.encryptor = encryptor
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const password = await this.encryptor.encrypt(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password }))
    return Promise.resolve(null)
  }
}
