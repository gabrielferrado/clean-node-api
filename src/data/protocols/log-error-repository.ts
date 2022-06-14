export interface LogErrorRepository {
  log: (message: string) => Promise<void>
}
