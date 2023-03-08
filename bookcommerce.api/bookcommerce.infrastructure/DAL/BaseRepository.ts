import { Entity, EntityTarget, FindManyOptions, FindOptionsWhere, ObjectID, ObjectLiteral, Repository, SaveOptions } from "typeorm";
import { DbFatory } from "./DbFactory";
// import { IBaseRepository } from "./Interfaces/IBaseRepository";

export class BaseRepository
{
  private readonly dbFactory?: DbFatory
  public Repository : Repository<ObjectLiteral> | undefined
  constructor()
  {
    this.dbFactory = new DbFatory()
  }

  public GetRepository(entity: EntityTarget<typeof Entity>) : void
  {
    const repository = this.dbFactory?.DbSet?.getRepository(entity)
    this.Repository = repository
  }

  public Add<T>(entity: T[], options?: SaveOptions & {
    reload: false;
  }) : boolean
  {
    this.Repository?.save(entity);
    return true;
  }

  public async AddAsync<T>(entity: T[], options?: SaveOptions & {
    reload: false;
  }) : Promise<boolean>
  {
    await this.Repository?.save(entity);
    return true;
  }

  public Update<T>(entity: T[], options?: SaveOptions & {
    reload: false;
  }) : boolean
  {
    this.Repository?.save(entity)
    return true;
  }

  public async GetAll() : Promise<ObjectLiteral[] | undefined>
  {
    return await this.Repository?.find()
  }
  
  public async Get(options: FindManyOptions<ObjectLiteral>) : Promise<ObjectLiteral[] | undefined>
  {
    return await this.Repository?.find(options)
  }

  public async GetOneBy(options: FindOptionsWhere<ObjectLiteral> | FindOptionsWhere<ObjectLiteral>[]) : Promise<ObjectLiteral | null | undefined>
  {
    return await this.Repository?.findOneBy(options)
  }

  public DeleteBy(options: string | number | FindOptionsWhere<ObjectLiteral> | Date | ObjectID | string[] | number[] | Date[] | ObjectID[]) : boolean
  {
    this.Repository?.delete(options)
    return true
  }
}