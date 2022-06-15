import { AccountModel } from '../../../domain/models/account'

export interface Encryptor {
  generate: (account: AccountModel) => Promise<string>
}
