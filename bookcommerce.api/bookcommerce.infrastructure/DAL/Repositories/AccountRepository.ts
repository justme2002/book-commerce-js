import { Repository } from "typeorm";
import { BaseResponse } from "../../DTO/Responses/BaseResponse";
import { BaseRepository } from "../BaseRepository";
import { DbFatory } from "../DbFactory";
import { Account } from "../Entities/Account";
import { IAccountRepository } from "../Interfaces/IAccountRepository";

export class AccountRepository extends BaseRepository implements IAccountRepository
{
  constructor()
  {
    super()
  }
  // public Register() : BaseResponse
  // {
  //   this.dbFactory?.DbSet?.getRepository(Account)
  //   return new BaseResponse()
  // }
}
