import { ValidatorComposite } from '../../../presentation/helpers/validators/validator-composite'
import { RequiredFieldValidator } from '../../../presentation/helpers/validators/required-field-validator'
import { Validator } from '../../../presentation/helpers/validators/validator'
import { EmailFieldValidator } from '../../../presentation/helpers/validators/email-field-validator'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailFieldValidator(new EmailValidatorAdapter()))

  return new ValidatorComposite(validations)
}
