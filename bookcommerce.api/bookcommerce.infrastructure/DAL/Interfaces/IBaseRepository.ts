import { Entity, FindManyOptions, FindOptionsWhere, ObjectID, ObjectLiteral } from "typeorm";

// export interface IBaseRepository
// {
//   GetRepository(entity: typeof Entity) : void
//   Add(entity: typeof Entity) : boolean
//   Update(entity: typeof Entity) : boolean
//   GetAll() : Promise<ObjectLiteral[] | undefined>
//   Get(options: FindManyOptions<ObjectLiteral>) : Promise<ObjectLiteral[] | undefined>
//   GetById(options: FindOptionsWhere<ObjectLiteral> | FindOptionsWhere<ObjectLiteral>[]) : Promise<ObjectLiteral | null | undefined>
//   DeleteBy(options: string | number | FindOptionsWhere<ObjectLiteral> | Date | ObjectID | string[] | number[] | Date[] | ObjectID[]) : boolean
// }