import { TriangleTypes } from '../usecases/add-triangle'

export interface TriangleModel {
  id: string
  type: TriangleTypes
  sides: number[]
}
