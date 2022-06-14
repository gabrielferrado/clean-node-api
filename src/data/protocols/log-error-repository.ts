export interface LogErrorRepository {
  logError: (message: string) => Promise<void>
}
