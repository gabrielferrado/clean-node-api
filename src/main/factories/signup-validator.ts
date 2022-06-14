
import { ValidatorComposite } from '../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidator } from '../../presentation/helpers/validators/required-field-validator'
import { Validator } from '../../presentation/helpers/validators/validator'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }

  return new ValidatorComposite(validations)
}
