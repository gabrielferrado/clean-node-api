import { ValidatorComposite , RequiredFieldValidator , CompareFieldsValidator , EmailFieldValidator } from '../../../../validation/validators'
import { Validator } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidator(field))
  }

  validations.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validations.push(new EmailFieldValidator(new EmailValidatorAdapter()))

  return new ValidatorComposite(validations)
}
