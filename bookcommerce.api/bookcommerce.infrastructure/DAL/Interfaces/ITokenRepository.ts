import { RefreshToken } from "../Entities/RefreshToken";

export interface ITokenRepository
{
  StoreRefreshTokenToDB(refreshToken: RefreshToken): boolean
}