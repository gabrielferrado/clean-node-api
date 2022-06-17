import { LoadTriangleController } from './load-triangle-controller'
import {
  LoadTriangle,
  TriangleModel,
  TriangleTypes
} from './load-triangle-controller-protocols'
import { ok } from '../../../helpers/http/http-helpers'

const makeFakeTriangles = (): TriangleModel[] => {
  return [
    {
      id: 'any_id',
      type: TriangleTypes.EQUILATERAL,
      sides: [1,1,1],
      date: new Date()
    },
    {
      id: 'other_id',
      type: TriangleTypes.EQUILATERAL,
      sides: [1,1,1],
      date: new Date()
    }
  ]
}

const makeLoadTriangle = (): LoadTriangle => {
  class LoadTriangleStub implements LoadTriangle {
    async load (): Promise<TriangleModel[]> {
      return Promise.resolve(makeFakeTriangles())
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
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeTriangles()))
  })
})
