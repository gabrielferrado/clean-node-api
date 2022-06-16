import { makeLoginValidator } from './login-validator-factory'
import { ValidatorComposite , RequiredFieldValidator , EmailFieldValidator } from '../../../../../validation/validators'
import { Validator } from '../../../../../presentation/protocols'
import { EmailValidator } from '../../../../../validation/protocols/email-validator'

jest.mock('../../../../../validation/validators/validator-composite')

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
