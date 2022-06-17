export enum TriangleTypes {
  EQUILATERAL = 'equilateral',
  ISOSCELES = 'isosceles',
  SCALENE = 'scalene'
}

export interface TriangleModel {
  id: string
  type: TriangleTypes
  sides: number[]
  date: Date
}
