import { AddTriangleController } from './add-triangle-controller'
import { Validator } from './add-triangle-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

const VALID_BODY = {
  side1: 2,
  side2: 2,
  side3: 3
}
const VALID_HTTP_REQUEST = {
  body: VALID_BODY
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidatorStub()
}

interface SutTypes {
  sut: AddTriangleController
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new AddTriangleController(validatorStub)
  return {
    sut,
    validatorStub
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
})
