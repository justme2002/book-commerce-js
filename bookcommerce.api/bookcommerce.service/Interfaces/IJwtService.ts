import jwt, { JwtPayload } from "jsonwebtoken"

export interface IJwtService
{
  generateAccessToken(payload: object, signature: jwt.Secret, expire: string): string
  generateRefreshToken(payload: object, signature: jwt.Secret, expire: string): string
  verifyToken(token: string, signature: jwt.Secret): string | JwtPayload
}