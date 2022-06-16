import { ValidatorComposite , RequiredFieldValidator , EmailFieldValidator } from '../../../presentation/helpers/validators'
import { Validator } from '../../../presentation/protocols/validator'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new EmailFieldValidator(new EmailValidatorAdapter()))

  return new ValidatorComposite(validations)
}
