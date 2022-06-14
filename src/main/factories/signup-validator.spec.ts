import { makeSignUpValidator } from './signup-validator'
import { ValidatorComposite } from '../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidator } from '../../presentation/helpers/validators/required-field-validator'
import { Validator } from '../../presentation/helpers/validators/validator'
import { CompareFieldsValidator } from '../../presentation/helpers/validators/compare-fields-validator'

jest.mock('../../presentation/helpers/validators/validator-composite')

describe('SignUpValidator Factory', function () {
  test('Should call ValidationComposite with all validations', () => {
    const validations: Validator[] = []
    makeSignUpValidator()

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidator(field))
    }
    validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    expect(ValidatorComposite).toHaveBeenCalledWith(validations)
  })
})
