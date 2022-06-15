
import { MissingParamError } from '../../errors'
import { ValidatorComposite } from './validator-composite'
import { Validator } from './validator'

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return new MissingParamError('field')
    }
  }
  return new ValidatorStub()
}
const makeSut = (): ValidatorComposite => {
  const validatorStub = makeValidatorStub()
  return new ValidatorComposite([validatorStub])
}

describe('Validator Composite', function () {
  test('Should return an error if an validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
