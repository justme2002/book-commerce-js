import 'reflect-metadata'
import dotenv from 'dotenv'
import DIContainer, { IDIContainer, object, use } from 'rsdi';
import express, { Express } from 'express'
import { ApplicationDbContext } from './bookcommerce.infrastructure/DAL/DbContext';
import { DbFatory } from './bookcommerce.infrastructure/DAL/DbFactory';
import mapAuthRoute from './bookcommerce.route/AuthRoute';
import { AccountController } from './bookcommerce.controller/AccountController';
import { AccountRepository } from './bookcommerce.infrastructure/DAL/Repositories/AccountRepository';
import { AccountService } from './bookcommerce.service/AccountService';
import { TokenRepository } from './bookcommerce.infrastructure/DAL/Repositories/TokenRepository';
import { RoleRepository } from './bookcommerce.infrastructure/DAL/Repositories/RoleRepository';
import { JwtService } from './bookcommerce.service/JwtService';
import { BaseRepository } from './bookcommerce.infrastructure/DAL/BaseRepository';
import mapMailRoute from './bookcommerce.route/MailRoute';
import { MailController } from './bookcommerce.controller/MailController';
import { MailService } from './bookcommerce.service/MailService';
import { VendorService } from './bookcommerce.service/VendorService';
import { VendorRepository } from './bookcommerce.infrastructure/DAL/Repositories/VendorRepository';
import MapVendorRoute from './bookcommerce.route/VendorRoute';
import { VendorController } from './bookcommerce.controller/VendorController';

const app = express()

export class StartUp
{
  public dbContext?: ApplicationDbContext
  constructor(
    public app?: Express, 
    public dbFactory?: DbFatory,
    public container?: DIContainer
  )
  {
    this.dbContext = dbFactory?.applicationDbContext;
  }

  public CreateEnviromentVariable()
  {
    dotenv.config()
  }
  
  public MapExpressMiddleware() : void
  {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.raw())
  }

  public async AddDataSourceContext(): Promise<void>
  {
    await this.dbContext?.connect()
  }

  public DependencyInjection() : IDIContainer | undefined
  {
    this.container?.add({
      //repo
      [BaseRepository.name]: object(BaseRepository),
      [AccountRepository.name]: object(AccountRepository),
      [VendorRepository.name]: object(VendorRepository),
      [TokenRepository.name]: object(TokenRepository),
      [RoleRepository.name]: object(RoleRepository),
      //service
      [JwtService.name]: object(JwtService),
      [MailService.name]: object(MailService),
      [AccountService.name]: object(AccountService).construct(
        use(AccountRepository),
        use(JwtService),
        use(TokenRepository),
        use(RoleRepository)
      ),
      [VendorService.name]: object(VendorService).construct(
        use(VendorRepository),
        use(AccountRepository)
      ),
      //controller
      [AccountController.name]: object(AccountController).construct(
        use(AccountService)
      ),
      [MailController.name]: object(MailController).construct(
        use(MailService)
      ),
      [VendorController.name]: object(VendorController).construct(
        use(VendorService)
      )
    })
    return this.container as IDIContainer
  }

  public MapRoute()
  {
    mapAuthRoute(app, this.DependencyInjection() as IDIContainer)
    mapMailRoute(app, this.DependencyInjection() as IDIContainer)
    MapVendorRoute(app, this.DependencyInjection() as IDIContainer)
  }

  public BindPort(port?: number) : void
  {
    app.listen(port, () => console.log(`port ${port} has launched`))
  }
}


