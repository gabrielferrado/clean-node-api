import { AddTriangle } from '@/domain/usecases/add-triangle'
import { DbAddTriangle } from '@/data/usecases/add-triangle/db-add-triangle'
import { TriangleMongoRepository } from '@/infra/db/mongodb/triangle/triangle-mongo-repository'

export const makeDbAddTriangle = (): AddTriangle => {
  const triangleMongoRepository = new TriangleMongoRepository()
  return new DbAddTriangle(triangleMongoRepository)
}
