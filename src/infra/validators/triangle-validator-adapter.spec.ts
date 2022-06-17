import { TriangleValidatorAdapter } from './triangle-validator-adapter'
import * as mockdate from 'mockdate'

const INVALID_SIDES = {
  side1: 2,
  side2: 6,
  side3: 2
}
const EQUILATERAL_SIDES = {
  side1: 2,
  side2: 2,
  side3: 2
}
const ISOSCELES_SIDES = {
  side1: 2,
  side2: 2,
  side3: 3
}
const SCALENE_SIDES = {
  side1: 2,
  side2: 5,
  side3: 6
}

const makeSut = (): TriangleValidatorAdapter => {
  return new TriangleValidatorAdapter()
}

describe('TriangleValidator Adapter', function () {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  test('Should return null if validation fails', () => {
    const sut = makeSut()
    const triangle = sut.classify(INVALID_SIDES)
    expect(triangle).toBeNull()
  })
  test('Should return an equilateral triangle', () => {
    const sut = makeSut()
    const triangle = sut.classify(EQUILATERAL_SIDES)
    expect(triangle).toEqual({
      type: 'equilateral',
      sides: Object.values(EQUILATERAL_SIDES),
      date: new Date()
    })
  })
  test('Should return an isosceles triangle', () => {
    const sut = makeSut()
    const triangle = sut.classify(ISOSCELES_SIDES)
    expect(triangle).toEqual({
      type: 'isosceles',
      sides: Object.values(ISOSCELES_SIDES),
      date: new Date()
    })
  })
  test('Should return a scalene triangle', () => {
    const sut = makeSut()
    const triangle = sut.classify(SCALENE_SIDES)
    expect(triangle).toEqual({
      type: 'scalene',
      sides: Object.values(SCALENE_SIDES),
      date: new Date()
    })
  })
})
