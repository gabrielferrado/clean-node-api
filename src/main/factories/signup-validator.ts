
import { ValidatorComposite } from '../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidator } from '../../presentation/helpers/validators/required-field-validator'
import { Validator } from '../../presentation/helpers/validators/validator'
import { CompareFieldsValidator } from '../../presentation/helpers/validators/compare-fields-validator'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }

  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))

  return new ValidatorComposite(validations)
}
