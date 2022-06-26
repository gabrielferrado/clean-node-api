import { AddTriangleModel } from '@/domain/usecases/add-triangle'

export interface Sides {
  side1: number
  side2: number
  side3: number
}

export interface TriangleValidator {
  classify: (sides: Sides) => AddTriangleModel
}
