import { Sides, TriangleValidator } from '../../validation/protocols/triangle-validator'
import { AddTriangleModel, TriangleTypes } from '../../domain/usecases/add-triangle'

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

    if (sidesSum === 0) {
      return {
        type: TriangleTypes.EQUILATERAL,
        sides: sidesArray
      }
    }

    if (greaterSide <= sidesSum) {
      if ([...new Set(sidesArray)].length === 2) {
        return {
          type: TriangleTypes.ISOSCELES,
          sides: sidesArray
        }
      }
      return {
        type: TriangleTypes.SCALENE,
        sides: sidesArray
      }
    }
    return null
  }
}
