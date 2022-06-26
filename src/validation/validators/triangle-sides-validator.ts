import { Sides, TriangleValidator } from '@/validation/protocols/triangle-validator'
import { InvalidParamError } from '@/presentation/errors'

export class TriangleSidesValidator {
  constructor (private readonly triangleValidator: TriangleValidator) {}

  validate (input: Sides): Error {
    const isValid = this.triangleValidator.classify(input)
    if (!isValid) return new InvalidParamError('sides')
  }
}
