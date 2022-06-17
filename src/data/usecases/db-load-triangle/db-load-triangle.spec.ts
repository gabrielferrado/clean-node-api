import { DbLoadTriangle } from './db-load-triangle'
import { TriangleModel, TriangleTypes } from '../../../domain/models/triangle'
import { LoadTriangleRepository } from '../../protocols/db/triangle/load-triangle-repository'

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

describe('DBLoadTriangles UseCase', function () {
  test('Should call LoadTriangleRepository', async () => {
    class LoadTriangleRepositoryStub implements LoadTriangleRepository {
      async loadAll (): Promise<TriangleModel[]> {
        return Promise.resolve(makeFakeTriangles())
      }
    }

    const loadTriangleRepositoryStub = new LoadTriangleRepositoryStub()
    const loadAllSpy = jest.spyOn(loadTriangleRepositoryStub, 'loadAll')
    const sut = new DbLoadTriangle(loadTriangleRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
