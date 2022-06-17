import { DbAddTriangle } from './db-add-triangle'
import {
  AddTriangle,
  AddTriangleModel,
  AddTriangleRepository,
  TriangleModel,
  TriangleTypes
} from './db-add-triangle-protocols'

const VALID_TRIANGLE = {
  id: 'any_id',
  type: TriangleTypes.SCALENE,
  sides: [3,4,5]
}

const makeAddTriangleRepository = (): AddTriangleRepository => {
  class AddTriangleRepositoryStub implements AddTriangleRepository {
    async add (triangleData: AddTriangleModel): Promise<TriangleModel> {
      return Promise.resolve(VALID_TRIANGLE)
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
    await sut.add(VALID_TRIANGLE)
    expect(addSpy).toHaveBeenCalledWith(VALID_TRIANGLE)
  })

  test('Should throw if AddTriangleRepository throws', async () => {
    const { sut, addTriangleRepositoryStub } = makeSut()
    jest.spyOn(addTriangleRepositoryStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.add(VALID_TRIANGLE)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a triangle on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(VALID_TRIANGLE)
    expect(account).toEqual(VALID_TRIANGLE)
  })
})
