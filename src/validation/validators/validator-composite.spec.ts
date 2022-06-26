import { MissingParamError } from '@/presentation/errors'
import { ValidatorComposite } from './validator-composite'
import { Validator } from '@/presentation/protocols'

interface SutTypes {
  sut: ValidatorComposite
  validatorStubs: Validator[]
}

const makeValidatorStub = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}
const makeSut = (): SutTypes => {
  const validatorStubs = [makeValidatorStub(), makeValidatorStub()]
  const sut = new ValidatorComposite(validatorStubs)
  return {
    sut,
    validatorStubs
  }
}

describe('Validator Composite', function () {
  test('Should return an error if an validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce((new MissingParamError('field')))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validatorStubs } = makeSut()
    jest.spyOn(validatorStubs[0], 'validate').mockReturnValueOnce((new Error()))
    jest.spyOn(validatorStubs[1], 'validate').mockReturnValueOnce((new MissingParamError('field')))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
