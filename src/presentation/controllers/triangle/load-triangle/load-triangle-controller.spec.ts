import { LoadTriangleController } from './load-triangle-controller'
import {
  LoadTriangle,
  TriangleModel,
  TriangleTypes
} from './load-triangle-controller-protocols'

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

const makeLoadTriangle = (): LoadTriangle => {
  class LoadTriangleStub implements LoadTriangle {
    async load (): Promise<TriangleModel[]> {
      return Promise.resolve([VALID_TRIANGLE, VALID_TRIANGLE, VALID_TRIANGLE])
    }
  }
  return new LoadTriangleStub()
}

interface SutTypes {
  sut: LoadTriangleController
  loadTriangleStub: LoadTriangle
}

const makeSut = (): SutTypes => {
  const loadTriangleStub = makeLoadTriangle()
  const sut = new LoadTriangleController(loadTriangleStub)
  return {
    sut,
    loadTriangleStub
  }
}

describe('LoadTriangle Controller', function () {
  test('Should call LoadTriangles', async () => {
    const { sut, loadTriangleStub } = makeSut()
    const loadSpy = jest.spyOn(loadTriangleStub, 'load')
    await sut.handle(VALID_HTTP_REQUEST)
    expect(loadSpy).toHaveBeenCalled()
  })
})
