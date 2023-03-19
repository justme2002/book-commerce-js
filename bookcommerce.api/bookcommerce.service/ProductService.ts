import { Product } from "../bookcommerce.infrastructure/DAL/Entities/Product";
import { SubCategory } from "../bookcommerce.infrastructure/DAL/Entities/SubCategory";
import { Vendor } from "../bookcommerce.infrastructure/DAL/Entities/Vendor";
import { ProductRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ProductRepository";
import { SubCategoryRepository } from "../bookcommerce.infrastructure/DAL/Repositories/SubCategoryRepository";
import { VendorRepository } from "../bookcommerce.infrastructure/DAL/Repositories/VendorRepository";
import { ProductRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductRequest";
import { ImageService } from "./ImageService";
import { IProductService } from "./Interfaces/IProductService";

export class ProductService implements IProductService
{
  constructor(
    private readonly productRepository?: ProductRepository,
    private readonly subCategoryRepository?: SubCategoryRepository,
    private readonly vendorRepository?: VendorRepository,
    private readonly imageService?: ImageService
  )
  {

  }
  
  public async createProduct(ProductRequest?: ProductRequest, subCategoryId?: string, accountId?: string): Promise<boolean> {
    try {
      this.productRepository?.GetRepository(Product)
      const subCategory = await this.getSubCategoryById(subCategoryId!)
      if (!subCategory) return false
      const vendor = await this.getVendorByAccountId(accountId!)
      if (!vendor) return false
      const product = new Product(
        ProductRequest?.ProductName,
        ProductRequest?.ProductDescription,
        ProductRequest?.Author,
        subCategory,
        vendor
      )
      const result = await this.productRepository?.AddAsync([product])
      if (result) {
        const uploadResult = await this.imageService?.UploadFile(product, ProductRequest?.Images)
        if (!uploadResult) return false 
      }
      return result!
    } catch (error) {
      console.log(error) 
      return false
    }
  }

  public async getAllProducts(): Promise<Product[]> {
    try {
      this.productRepository?.GetRepository(Product)
      const result = await this.productRepository?.Get({
        relations: {
          SubCategory: true,
          Vendor: true,
          Images: true
        }
      })
      return result as Product[] 
    } catch (error) {
      console.log(error)
      return [] as Product[]
    }
  }
  
  public async getProductById(id: string): Promise<Product> {
    try {
      this.productRepository?.GetRepository(Product)
      const result = await this.productRepository?.GetOneBy({
        ProductId: id
      })
      return result as Product
    } catch (error) {
      console.log(error)
      return {} as Product
    }
  }

  updateProduct(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private async getSubCategoryById(id: string): Promise<SubCategory | undefined> {
    try {
      this.subCategoryRepository?.GetRepository(SubCategory)
      const result = await this.subCategoryRepository?.GetOneBy({
        SubCategoryId: id
      })
      return result as SubCategory
    } catch (error) {
      console.log(error)
    }
  }

  private async getVendorByAccountId(id: string): Promise<Vendor | undefined> {
    try {
      this.vendorRepository?.GetRepository(Vendor)
      const result = await this.vendorRepository?.GetOneBy({
        Account: {
          AccountId: id
        }
      })
      return result as Vendor
    } catch (error) {
      console.log(error)
    }
  }
}