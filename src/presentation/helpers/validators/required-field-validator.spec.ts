import { RequiredFieldValidator } from './required-field-validator'
import { MissingParamError } from '../../errors'

describe('RequiredField Validator', function () {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidator('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidator('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
