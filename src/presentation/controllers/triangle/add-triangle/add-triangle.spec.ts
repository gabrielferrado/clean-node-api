import { AddTriangleController } from './add-triangle-controller'
import { AddTriangle, AddTriangleModel, TriangleModel, Validator } from './add-triangle-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

const VALID_BODY = {
  side1: 2,
  side2: 2,
  side3: 3
}
const VALID_HTTP_REQUEST = {
  body: VALID_BODY
}
const VALID_TRIANGLE = {
  id: 'any_id',
  type: 'any_type',
  sides: [3,4,5]
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

interface SutTypes {
  sut: AddTriangleController
  validatorStub: Validator
  addTriangleStub: AddTriangle
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const addTriangleStub = makeAddTriangle()
  const sut = new AddTriangleController(validatorStub, addTriangleStub)
  return {
    sut,
    validatorStub,
    addTriangleStub
  }
}

describe('AddTriangle Controller', function () {
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
    expect(addTriangleSpy).toHaveBeenCalledWith(VALID_BODY)
  })
})
