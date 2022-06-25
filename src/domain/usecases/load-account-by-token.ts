import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<AccountModel>
}
