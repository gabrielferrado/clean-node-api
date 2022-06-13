import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', function () {
  test('Should return false if validation fails', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
