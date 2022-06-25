import { AddTriangleController } from './add-triangle-controller'
import {
  AddTriangle,
  AddTriangleModel,
  InvalidParamError,
  ServerError,
  Sides,
  TriangleModel,
  TriangleTypes,
  TriangleValidator,
  Validator
} from './add-triangle-controller-protocols'
import mockdate from 'mockdate'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helpers'

const VALID_BODY = {
  side1: 1,
  side2: 1,
  side3: 1
}
const VALID_HTTP_REQUEST = {
  body: VALID_BODY
}
const VALID_TRIANGLE = {
  id: 'any_id',
  type: TriangleTypes.EQUILATERAL,
  sides: [1,1,1],
  date: new Date()
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}
const makeAddTriangle = (): AddTriangle => {
  class AddTriangleStub implements AddTriangle {
    async add (data: AddTriangleModel): Promise<TriangleModel> {
      return Promise.resolve(VALID_TRIANGLE)
    }
  }
  return new AddTriangleStub()
}
const makeTriangleValidator = (): TriangleValidator => {
  class TriangleValidatorStub implements TriangleValidator {
    classify (sides: Sides): AddTriangleModel {
      return {
        type: TriangleTypes.EQUILATERAL,
        sides: VALID_TRIANGLE.sides,
        date: new Date()
      }
    }
  }
  return new TriangleValidatorStub()
}

interface SutTypes {
  sut: AddTriangleController
  validatorStub: Validator
  addTriangleStub: AddTriangle
  triangleValidatorStub: TriangleValidator
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const addTriangleStub = makeAddTriangle()
  const triangleValidatorStub = makeTriangleValidator()
  const sut = new AddTriangleController(validatorStub, addTriangleStub, triangleValidatorStub)
  return {
    sut,
    validatorStub,
    addTriangleStub,
    triangleValidatorStub
  }
}

describe('AddTriangle Controller', function () {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  test('Should call Validator with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(validateSpy).toHaveBeenCalledWith(VALID_BODY)
  })

  test('Should return 400 if Validator fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddTriangle with correct values', async () => {
    const { sut, addTriangleStub } = makeSut()
    const addTriangleSpy = jest.spyOn(addTriangleStub, 'add')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(addTriangleSpy).toHaveBeenCalledWith({ type: VALID_TRIANGLE.type, sides: VALID_TRIANGLE.sides, date: new Date() })
  })

  test('Should call TriangleValidator with correct values', async () => {
    const { sut, triangleValidatorStub } = makeSut()
    const classifySpy = jest.spyOn(triangleValidatorStub, 'classify')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(classifySpy).toHaveBeenCalledWith(VALID_BODY)
  })

  test('Should return 400 if TriangleValidator fails', async () => {
    const { sut, triangleValidatorStub } = makeSut()
    jest.spyOn(triangleValidatorStub, 'classify').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('sides')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(ok(VALID_TRIANGLE))
  })

  test('Should return 500 if add triangle fails', async () => {
    const { sut, addTriangleStub } = makeSut()
    jest.spyOn(addTriangleStub, 'add')
      .mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
    const httpResponse = await sut.handle(VALID_HTTP_REQUEST)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
