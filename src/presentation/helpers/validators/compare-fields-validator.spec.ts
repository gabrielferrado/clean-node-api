import { InvalidParamError } from '../../errors'
import { CompareFieldsValidator } from './compare-fields-validator'

const makeSut = (): CompareFieldsValidator => {
  return new CompareFieldsValidator('field', 'fieldToCompare')
}

describe('CompareField Validator', function () {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
