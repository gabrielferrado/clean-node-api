import { DbAddTriangle } from './db-add-triangle'
import { AddTriangle, AddTriangleModel, AddTriangleRepository, TriangleModel } from './db-add-triangle-protocols'

const VALID_SIDES = {
  side1: 1,
  side2: 1,
  side3: 1
}
const VALID_TRIANGLE = {
  type: 'any_type',
  sides: [3,4,5]
}

const makeAddTriangleRepository = (): AddTriangleRepository => {
  class AddTriangleRepositoryStub implements AddTriangleRepository {
    async add (triangleData: AddTriangleModel): Promise<TriangleModel> {
      return Promise.resolve({ id: 'any_id', ...VALID_TRIANGLE })
    }
  }
  return new AddTriangleRepositoryStub()
}

interface SutTypes {
  sut: DbAddTriangle
  addTriangleRepositoryStub: AddTriangle
}

const makeSut = (): SutTypes => {
  const addTriangleRepositoryStub = makeAddTriangleRepository()
  const sut = new DbAddTriangle(addTriangleRepositoryStub)
  return {
    sut,
    addTriangleRepositoryStub
  }
}

describe('DbAddTriangle UseCase', function () {
  test('Should call AddTriangleRepository with correct values', async () => {
    const { sut, addTriangleRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTriangleRepositoryStub, 'add')
    await sut.add(VALID_SIDES)
    expect(addSpy).toHaveBeenCalledWith(VALID_SIDES)
  })

  test('Should throw if AddTriangleRepository throws', async () => {
    const { sut, addTriangleRepositoryStub } = makeSut()
    jest.spyOn(addTriangleRepositoryStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.add(VALID_SIDES)
    await expect(promise).rejects.toThrow()
  })
})
