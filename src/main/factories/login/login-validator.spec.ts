import { makeLoginValidator } from './login-validator'
import { ValidatorComposite } from '../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidator } from '../../../presentation/helpers/validators/required-field-validator'
import { Validator } from '../../../presentation/protocols/validator'
import { EmailFieldValidator } from '../../../presentation/helpers/validators/email-field-validator'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidator Factory', function () {
  test('Should call ValidationComposite with all validations', () => {
    const validations: Validator[] = []
    makeLoginValidator()

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidator(field))
    }
    validations.push(new EmailFieldValidator(makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
