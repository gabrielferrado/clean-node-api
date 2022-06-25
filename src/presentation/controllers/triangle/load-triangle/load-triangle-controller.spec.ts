import * as mockdate from 'mockdate'
import { LoadTriangleController } from './load-triangle-controller'
import {
  LoadTriangle,
  ServerError,
  TriangleModel,
  TriangleTypes
} from './load-triangle-controller-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helpers'

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
  beforeAll(() => {
    mockdate.set(new Date())
  })

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

  test('Should return 204 if LoadTriangle returns empty', async () => {
    const { sut, loadTriangleStub } = makeSut()
    jest.spyOn(loadTriangleStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if load fails', async () => {
    const { sut, loadTriangleStub } = makeSut()
    jest.spyOn(loadTriangleStub, 'load')
      .mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
