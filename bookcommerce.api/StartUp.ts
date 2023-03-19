import 'reflect-metadata'
import dotenv from 'dotenv'
import DIContainer, { IDIContainer, object, use } from 'rsdi';
import multer from 'multer'
import cloudinary from 'cloudinary'
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
import MapCategoryRoute from './bookcommerce.route/CategoryRoute';
import { CategoryRepository } from './bookcommerce.infrastructure/DAL/Repositories/CategoryRepository';
import { CategoryService } from './bookcommerce.service/CategoryService';
import { CategoryController } from './bookcommerce.controller/CategoryController';
import MapSubCategoryRoute from './bookcommerce.route/SubCategoryRoute';
import { SubCategoryRepository } from './bookcommerce.infrastructure/DAL/Repositories/SubCategoryRepository';
import { SubCategoryService } from './bookcommerce.service/SubCategoryService';
import { SubCategoryController } from './bookcommerce.controller/SubCategoryController';
import mapProductRoute from './bookcommerce.route/ProductRoute';
import { ProductRepository } from './bookcommerce.infrastructure/DAL/Repositories/ProductRepository';
import { ProductService } from './bookcommerce.service/ProductService';
import { ProductController } from './bookcommerce.controller/ProductController';
import { ProductVariantRepository } from './bookcommerce.infrastructure/DAL/Repositories/ProductVariantRepository';
import { ProductVariantService } from './bookcommerce.service/ProductVariantService';
import { ProductVariantController } from './bookcommerce.controller/ProductVariantController';
import mapProductVariantRoute from './bookcommerce.route/ProductVariantRoute';
import { ProductVariantPriceRepository } from './bookcommerce.infrastructure/DAL/Repositories/ProductVariantPriceRepository';
import { ProductVariantPriceService } from './bookcommerce.service/ProductVariantPriceService';
import { ProductVariantPriceController } from './bookcommerce.controller/ProductVariantPriceController';
import mapProductVariantPriceRoute from './bookcommerce.route/ProductVariantPriceRoute';
import { ImageRepository } from './bookcommerce.infrastructure/DAL/Repositories/ImageRepository';
import { ImageService } from './bookcommerce.service/ImageService';
import { CloudinaryService } from './bookcommerce.service/CloudinaryService';

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

  public CreateCloudinaryUploader()
  {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })
  }
  
  public MapExpressMiddleware() : void
  {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.raw())
  }

  public GenerateStaticFolder(): void
  {
    app.use(express.static("bookcommerce.public"))
  }

  public AddMulter() : multer.Multer
  {
    const storage = multer.diskStorage({
      filename: (req, file, callback) => {
        callback(null, `${file.originalname}.jpg`)
      },
      destination: (req, file, callback) => {
        callback(null, 'bookcommerce.public/image/')
      }
    })

    const upload = multer({ storage })
    return upload
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
      [CategoryRepository.name]: object(CategoryRepository),
      [SubCategoryRepository.name]: object(SubCategoryRepository),
      [ProductRepository.name]: object(ProductRepository),
      [ProductVariantRepository.name]: object(ProductVariantRepository),
      [ProductVariantPriceRepository.name]: object(ProductVariantPriceRepository),
      [ImageRepository.name]: object(ImageRepository),
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
      [CategoryService.name]: object(CategoryService).construct(
        use(CategoryRepository)
      ),
      [SubCategoryService.name]: object(SubCategoryService).construct(
        use(SubCategoryRepository),
        use(CategoryService),
        use(VendorRepository)
      ),
      [ProductService.name]: object(ProductService).construct(
        use(ProductRepository),
        use(SubCategoryRepository),
        use(VendorRepository),
        use(ImageService)
      ),
      [ProductVariantService.name]: object(ProductVariantService).construct(
        use(ProductVariantRepository),
        use(ProductService),
        use(ImageService),
      ),
      [ProductVariantPriceService.name]: object(ProductVariantPriceService).construct(
        use(ProductVariantRepository),
        use(ProductVariantPriceRepository)
      ),
      [ImageService.name]: object(ImageService).construct(
        use(ImageRepository),
        use(CloudinaryService),
      ),
      [CloudinaryService.name]: object(CloudinaryService).construct(),
      //controller
      [AccountController.name]: object(AccountController).construct(
        use(AccountService)
      ),
      [MailController.name]: object(MailController).construct(
        use(MailService)
      ),
      [VendorController.name]: object(VendorController).construct(
        use(VendorService)
      ),
      [CategoryController.name]: object(CategoryController).construct(
        use(CategoryService)
      ),
      [SubCategoryController.name]: object(SubCategoryController).construct(
        use(SubCategoryService)
      ),
      [ProductController.name]: object(ProductController).construct(
        use(ProductService)
      ),
      [ProductVariantController.name]: object(ProductVariantController).construct(
        use(ProductVariantService)
      ),
      [ProductVariantPriceController.name]: object(ProductVariantPriceController).construct(
        use(ProductVariantPriceService),
      )
    })
    return this.container as IDIContainer
  }

  public MapRoute()
  {
    mapAuthRoute(app, this.DependencyInjection() as IDIContainer)
    mapMailRoute(app, this.DependencyInjection() as IDIContainer)
    MapVendorRoute(app, this.DependencyInjection() as IDIContainer)
    MapCategoryRoute(app, this.DependencyInjection() as IDIContainer)
    MapSubCategoryRoute(app, this.DependencyInjection() as IDIContainer)
    mapProductRoute(app, this.DependencyInjection() as IDIContainer, this.AddMulter())
    mapProductVariantRoute(app, this.DependencyInjection() as IDIContainer, this.AddMulter())
    mapProductVariantPriceRoute(app, this.DependencyInjection() as IDIContainer)
  }

  public BindPort(port?: number) : void
  {
    app.listen(port, () => console.log(`port ${port} has launched`))
  }
}


