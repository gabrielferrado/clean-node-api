import { Validator } from '../../presentation/protocols'
import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols/email-validator'

export class EmailFieldValidator implements Validator {
  constructor (private readonly emailValidator: EmailValidator) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input.email)
    if (!isValid) return new InvalidParamError('email')
  }
}
