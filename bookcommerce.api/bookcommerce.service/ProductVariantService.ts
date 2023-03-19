import { ProductVariant } from "../bookcommerce.infrastructure/DAL/Entities/ProductVariant";
import { ProductVariantRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ProductVariantRepository";
import { ProductVariantRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantRequest";
import { ProductVariantUpdateQuantityRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantUpdateQuantityRequest";
import { ImageService } from "./ImageService";
import { IProductVariantService } from "./Interfaces/IProductVariantService";
import { ProductService } from "./ProductService";


export class ProductVariantService implements IProductVariantService
{
  constructor(private readonly productVariantRepository?: ProductVariantRepository,
    private readonly productService?: ProductService,
    private readonly imageService?: ImageService
  ){}
  
  public async GetProductVariantsByProductId(productId: string): Promise<ProductVariant[] | undefined> {
    try {
      this.productVariantRepository?.GetRepository(ProductVariant)
      const result = await this.productVariantRepository?.Get({
        where: {
          Product: {
            ProductId: productId
          }
        }
      })
      return result as ProductVariant[]
    } catch (error) {
      console.log(error)
      return []
    }
  }

  public async CreateVariant(ProductVariantRequest?: ProductVariantRequest | undefined): Promise<boolean | undefined> {
    try {
      this.productVariantRepository?.GetRepository(ProductVariant)
      const productToCreateVariant = await this.productService?.getProductById(ProductVariantRequest?.ProductId as string)
      const productVariant: ProductVariant = new ProductVariant(
        ProductVariantRequest?.ProductVariantName,
        ProductVariantRequest?.ProductVariantQuantity,
        productToCreateVariant
      )
      if (!ProductVariantRequest?.ProductVariantName || !ProductVariantRequest.ProductVariantQuantity) return false
      const result = await this.productVariantRepository?.AddAsync([productVariant])
      // if (result) {
      //   const uploadResult = await this.imageService?.UploadFile(productVariant, ProductVariantRequest?.Images)
      // }
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  public async UpdateVariantName(productVariantUpdateQuantityRequest: ProductVariantUpdateQuantityRequest): Promise<boolean | undefined> {
    throw new Error("Method not implemented.");
  }

  public async UpdateVariantQuantity(productVariantUpdateQuantityRequest: ProductVariantUpdateQuantityRequest): Promise<boolean | undefined> {
    try {
      this.productVariantRepository?.GetRepository(ProductVariant)
      const productVariant = await this.getProductVariantToUpdateById(productVariantUpdateQuantityRequest.productVariantId)
      productVariant.ProductVariantQuantity = productVariantUpdateQuantityRequest.productVariantQuantity
      const result = await this.productVariantRepository?.UpdateAsync([productVariant])
      return result
    } catch (error) {
      console.log(error)
      return false
    }
  }

  private async getProductVariantToUpdateById(productVariantId: string) : Promise<ProductVariant>
  {
    try {
      const result = await this.productVariantRepository?.GetOneBy({
        ProductVariantId: productVariantId
      })
      return result as ProductVariant
    } catch (error) {
      console.log(error)
      return {} as ProductVariant
    }
  }
}