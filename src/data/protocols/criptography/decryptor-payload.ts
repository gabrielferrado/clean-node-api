import { JwtPayload } from 'jsonwebtoken'

export interface DecryptorPayload extends JwtPayload {
  id: string
  iat: number
}
