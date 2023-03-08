import { BaseRepository } from "../BaseRepository";
import { RefreshToken } from "../Entities/RefreshToken";
import { ITokenRepository } from "../Interfaces/ITokenRepository";

export class TokenRepository extends BaseRepository implements ITokenRepository
{
  public StoreRefreshTokenToDB(refreshToken: RefreshToken): boolean {
    this.GetRepository(RefreshToken)
    const result = this.Add([refreshToken])
    return result
  }
}