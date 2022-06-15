import { RequiredFieldValidator } from './required-field-validator'
import { MissingParamError } from '../../errors'

describe('RequiredField Validator', function () {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidator('any_field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
