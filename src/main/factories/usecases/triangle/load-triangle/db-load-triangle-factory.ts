import { TriangleMongoRepository } from '@/infra/db/mongodb/triangle/triangle-mongo-repository'
import { DbLoadTriangle } from '@/data/usecases/db-load-triangle/db-load-triangle'

export const makeDbLoadTriangle = (): DbLoadTriangle => {
  const triangleMongoRepository = new TriangleMongoRepository()
  return new DbLoadTriangle(triangleMongoRepository)
}
