import { DbLoadTriangle } from './db-load-triangle'
import { TriangleModel, TriangleTypes } from '../../../domain/models/triangle'
import { LoadTriangleRepository } from '../../protocols/db/triangle/load-triangle-repository'
import { LoadTriangle } from '../../../domain/usecases/load-triangle'

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
})
