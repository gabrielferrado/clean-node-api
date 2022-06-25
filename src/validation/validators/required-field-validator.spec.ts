import { RequiredFieldValidator } from './required-field-validator'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidator => {
  return new RequiredFieldValidator('field')
}

describe('RequiredField Validator', function () {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
