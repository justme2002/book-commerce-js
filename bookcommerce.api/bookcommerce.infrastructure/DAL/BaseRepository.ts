import { Entity, FindManyOptions, FindOptionsWhere, ObjectID, ObjectLiteral, Repository } from "typeorm";
import { DbFatory } from "./DbFactory";
import { IBaseRepository } from "./Interfaces/IBaseRepository";

export class BaseRepository implements IBaseRepository
{
  private readonly dbFactory?: DbFatory
  public Repository : Repository<ObjectLiteral> | undefined
  constructor()
  {
    this.dbFactory = new DbFatory()
  }

  public GetRepository(entity: typeof Entity) : void
  {
    const repository = this.dbFactory?.DbSet?.getRepository(entity)
    this.Repository = repository
  }

  public Add(entity: typeof Entity) : boolean
  {
    this.Repository?.save(entity);
    return true;
  }

  public Update(entity: typeof Entity) : boolean
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

  public async GetById(options: FindOptionsWhere<ObjectLiteral> | FindOptionsWhere<ObjectLiteral>[]) : Promise<ObjectLiteral | null | undefined>
  {
    return await this.Repository?.findOneBy(options)
  }

  public DeleteBy(options: string | number | FindOptionsWhere<ObjectLiteral> | Date | ObjectID | string[] | number[] | Date[] | ObjectID[]) : boolean
  {
    this.Repository?.delete(options)
    return true
  }
}