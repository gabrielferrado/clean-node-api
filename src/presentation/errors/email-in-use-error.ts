export class EmailInUseError extends Error {
  constructor () {
    super('The email provided is already in use')
    this.name = 'EmailInUseError'
  }
}
