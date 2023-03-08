import { ObjectLiteral } from "typeorm";
import { BaseRepository } from "../BaseRepository";
import { Account } from "../Entities/Account";
import { Role } from "../Entities/Role";
import { RoleType } from "../Entities/RoleType";
import { IRoleRepository } from "../Interfaces/IRoleRepository";

export class RoleRepository extends BaseRepository implements IRoleRepository
{
  constructor()
  {
    super()
  }

  public async CreateRole(roleType: RoleType): Promise<boolean> {
    this.GetRepository(RoleType)
    const result = await this.AddAsync([roleType])
    return result
  }

  public async CheckRole(roleName: string): Promise<ObjectLiteral | null | undefined> {
    this.GetRepository(RoleType)
    const result = await this.GetOneBy({
      RoleType: roleName
    })
    if (!result) return null
    return result 
  }

  public async GetRole(roleName: string): Promise<ObjectLiteral | null | undefined> {
    this.GetRepository(RoleType)
    const result = await this.GetOneBy({
      RoleType: roleName
    })
    return result
  }

  public async AddUserToRole(role: Role): Promise<boolean> {
    this.GetRepository(Role)
    const result = await this.AddAsync([role])
    return result
  }
}