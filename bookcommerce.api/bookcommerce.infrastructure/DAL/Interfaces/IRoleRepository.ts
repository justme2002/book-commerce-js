import { ObjectLiteral } from "typeorm";
import { Account } from "../Entities/Account";
import { Role } from "../Entities/Role";
import { RoleType } from "../Entities/RoleType";

export interface IRoleRepository
{
  CreateRole(roleType: RoleType): Promise<boolean>
  CheckRole(roleName: string): Promise<ObjectLiteral | null | undefined>
  AddUserToRole(role: Role): Promise<boolean>
  GetRole(roleName: string): Promise<ObjectLiteral | null | undefined>
}