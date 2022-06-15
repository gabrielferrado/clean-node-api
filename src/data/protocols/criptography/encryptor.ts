export interface Encryptor {
  encrypt: (value: any) => Promise<string>
}
