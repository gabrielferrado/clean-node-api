import * as mockdate from 'mockdate'
import { TriangleSidesValidator } from './triangle-sides-validator'
import { InvalidParamError } from '@/presentation/errors'
import { AddTriangleModel } from '@/domain/usecases/add-triangle'
import { TriangleTypes } from '@/domain/models/triangle'
import { Sides, TriangleValidator } from '@/validation/protocols/triangle-validator'

const VALID_TRIANGLE = {
  type: TriangleTypes.EQUILATERAL,
  sides: [1,1,1],
  date: new Date()
}
const VALID_SIDES = {
  side1: 1,
  side2: 1,
  side3: 1
}

interface SutTypes {
  sut: TriangleSidesValidator
  triangleValidatorStub: TriangleValidator
}

const makeTriangleValidator = (): TriangleValidator => {
  class TriangleValidatorStub implements TriangleValidator {
    classify (sides: Sides): AddTriangleModel {
      return VALID_TRIANGLE
    }
  }
  return new TriangleValidatorStub()
}

const makeSut = (): SutTypes => {
  const triangleValidatorStub = makeTriangleValidator()
  const sut = new TriangleSidesValidator(triangleValidatorStub)
  return {
    sut,
    triangleValidatorStub
  }
}

describe('TriangleFieldValidator Factory', function () {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  test('Should return an error if TriangleValidator returns null', () => {
    const { sut, triangleValidatorStub } = makeSut()
    jest.spyOn(triangleValidatorStub, 'classify').mockReturnValueOnce(null)
    const error = sut.validate(VALID_SIDES)
    expect(error).toEqual(new InvalidParamError('sides'))
  })

  test('Should call Triangle validator with correct values', () => {
    const { sut, triangleValidatorStub } = makeSut()
    const classifySpy = jest.spyOn(triangleValidatorStub, 'classify')
    sut.validate(VALID_SIDES)
    expect(classifySpy).toHaveBeenCalledWith(VALID_SIDES)
  })

  test('Should throw if Triangle validator throws', () => {
    const { sut, triangleValidatorStub } = makeSut()
    jest.spyOn(triangleValidatorStub, 'classify').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
