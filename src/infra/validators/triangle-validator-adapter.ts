import { Sides, TriangleValidator } from '../../validation/protocols/triangle-validator'
import { AddTriangleModel } from '../../domain/usecases/add-triangle'
import { TriangleTypes } from '../../domain/models/triangle'

const toInteger = (value: any): number => {
  return parseInt(value, 10)
}

export class TriangleValidatorAdapter implements TriangleValidator {
  classify (sides: Sides): AddTriangleModel {
    const sidesArray = Object.values(sides)
    const greaterSide = Math.max(...sidesArray)
    const sidesSum = (
      sidesArray.filter((el) => el !== greaterSide))
      .reduce((previousValue, currentValue) =>
        toInteger(previousValue) + toInteger(currentValue), 0)

    const payload = {
      sides: sidesArray,
      date: new Date()
    }

    if (sidesSum === 0) {
      return {
        type: TriangleTypes.EQUILATERAL,
        ...payload
      }
    }

    if (greaterSide <= sidesSum) {
      if ([...new Set(sidesArray)].length === 2) {
        return {
          type: TriangleTypes.ISOSCELES,
          ...payload
        }
      }
      return {
        type: TriangleTypes.SCALENE,
        ...payload
      }
    }
    return null
  }
}
