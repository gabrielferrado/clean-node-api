export interface AuthenticatorModel {
  email: string
  password: string
}

export interface Authenticator {
  auth: (authentication: AuthenticatorModel) => Promise<string>
}
