import { ValidatorComposite , RequiredFieldValidator } from '../../../../../validation/validators'
import { Validator } from '../../../../../presentation/protocols'
import { TriangleSidesValidator } from '../../../../../validation/validators/triangle-sides-validator'
import { TriangleValidatorAdapter } from '../../../../../infra/validators/triangle-validator-adapter'

export const makeAddTriangleValidator = (): ValidatorComposite => {
  const validations: Validator[] = []

  for (const field of ['side1', 'side2', 'side3']) {
    validations.push(new RequiredFieldValidator(field))
  }
  validations.push(new TriangleSidesValidator(new TriangleValidatorAdapter()))
  return new ValidatorComposite(validations)
}
