import { TriangleModel } from '@/domain/models/triangle'

export interface LoadTriangle {
  load: () => Promise<TriangleModel[]>
}
