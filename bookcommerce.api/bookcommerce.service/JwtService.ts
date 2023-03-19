import { IJwtService } from "./Interfaces/IJwtService";
import jwt, { JwtPayload } from 'jsonwebtoken'

export class JwtService implements IJwtService
{
  generateAccessToken(payload: object, signature: jwt.Secret, expire?: string): string {
    const accessToken = jwt.sign(payload, signature, { expiresIn: expire })
    return accessToken
  }
  generateRefreshToken(payload: object, signature: jwt.Secret): string {
    const refreshToken = jwt.sign(payload, signature)
    return refreshToken
  }
  verifyToken(token: string, signature: jwt.Secret): string | JwtPayload {
    const verifyToken = jwt.verify(token, signature)
    return verifyToken
  }
}