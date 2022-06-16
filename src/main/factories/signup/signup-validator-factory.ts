import { ValidatorComposite , RequiredFieldValidator , CompareFieldsValidator , EmailFieldValidator } from '../../../presentation/helpers/validators'
import { Validator } from '../../../presentation/protocols/validator'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }

  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidator(new EmailValidatorAdapter()))

  return new ValidatorComposite(validations)
}
