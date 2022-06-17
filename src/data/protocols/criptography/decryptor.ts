import { DecryptorPayload } from './decryptor-payload'

export interface Decryptor {
  decrypt: (value: string) => Promise<DecryptorPayload>
}
