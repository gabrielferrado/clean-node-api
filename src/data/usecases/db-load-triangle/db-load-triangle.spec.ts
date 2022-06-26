import { DbLoadTriangle } from './db-load-triangle'
import { LoadTriangleRepository, TriangleModel, TriangleTypes, LoadTriangle } from './db-load-triangle-protocols'

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

const makeLoadTriangleRepository = (): LoadTriangleRepository => {
  class LoadTriangleRepositoryStub implements LoadTriangleRepository {
    async loadAll (): Promise<TriangleModel[]> {
      return Promise.resolve(makeFakeTriangles())
    }
  }
  return new LoadTriangleRepositoryStub()
}

interface SutTypes {
  sut: LoadTriangle
  loadTriangleRepositoryStub: LoadTriangleRepository
}
const makeSut = (): SutTypes => {
  const loadTriangleRepositoryStub = makeLoadTriangleRepository()
  const sut = new DbLoadTriangle(loadTriangleRepositoryStub)
  return {
    sut,
    loadTriangleRepositoryStub
  }
}

describe('DBLoadTriangles UseCase', function () {
  test('Should call LoadTriangleRepository', async () => {
    const { sut, loadTriangleRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadTriangleRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return triangles on loadAll', async () => {
    const { sut } = makeSut()
    const triangles = await sut.load()
    expect(triangles).toEqual(makeFakeTriangles())
  })

  test('Should throw if LoadTriangleRepository throws', async () => {
    const { sut, loadTriangleRepositoryStub } = makeSut()
    jest.spyOn(loadTriangleRepositoryStub, 'loadAll').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
