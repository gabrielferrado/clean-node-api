import { TriangleModel } from '../models/triangle'

export interface AddTriangleModel {
  side1: number
  side2: number
  side3: number
}

export interface AddTriangle {
  add: (data: AddTriangleModel) => Promise<TriangleModel>
}
