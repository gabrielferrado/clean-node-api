import { Validator } from './validator'
import { MissingParamError } from '../../errors'

export class RequiredFieldValidator implements Validator {
  private readonly fieldName: string
  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
