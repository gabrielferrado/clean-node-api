import { TriangleModel, TriangleTypes } from '../models/triangle'

export interface AddTriangleModel {
  type: TriangleTypes
  sides: number[]
  date: Date
}

export interface AddTriangle {
  add: (data: AddTriangleModel) => Promise<TriangleModel>
}
