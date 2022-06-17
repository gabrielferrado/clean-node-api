import { TriangleModel } from '../models/triangle'

export interface LoadTriangle {
  load: () => Promise<TriangleModel[]>
}
