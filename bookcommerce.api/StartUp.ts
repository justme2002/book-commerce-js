import express, { Express } from 'express'
import { ApplicationDbContext } from './bookcommerce.infrastructure/DAL/DbContext';
import { DbFatory } from './bookcommerce.infrastructure/DAL/DbFactory';
const app = express()

export class StartUp
{
  public dbContext?: ApplicationDbContext
  constructor(public app?: Express, public dbFactory?: DbFatory)
  {
    this.dbContext = dbFactory?.applicationDbContext;
  }
  
  public MapExpressMiddleware() : void
  {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.raw())
  }

  public async AddDataSourceContext(): Promise<void>
  {
    this.dbContext?.connect()
  }

  public BindPort(port: number) : void
  {
    app.listen(port, () => console.log(`port ${port} has launched`))
  }
}


