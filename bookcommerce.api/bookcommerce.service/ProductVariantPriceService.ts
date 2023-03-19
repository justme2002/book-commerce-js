import { ProductPrice } from "../bookcommerce.infrastructure/DAL/Entities/ProductPrice";
import { ProductVariant } from "../bookcommerce.infrastructure/DAL/Entities/ProductVariant";
import { ProductVariantPriceRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ProductVariantPriceRepository";
import { ProductVariantRepository } from "../bookcommerce.infrastructure/DAL/Repositories/ProductVariantRepository";
import { ProductVariantCreatePriceRequest } from "../bookcommerce.infrastructure/DTO/requests/ProductVariantCreatePriceRequest";
import { IProductVariantPriceService } from "./Interfaces/IProductVariantPriceService";

export class ProductVariantPriceService implements IProductVariantPriceService
{
  constructor(private readonly productVariantRepository?: ProductVariantRepository,
    private readonly productVariantPriceRepository?: ProductVariantPriceRepository)
  {
    
  }
  public async CreateProductVariantPrice(productVariantCreatePriceRequest: ProductVariantCreatePriceRequest): Promise<boolean> {
    try {
      this.productVariantPriceRepository?.GetRepository(ProductPrice)
      const productVariant = await this.getProductVariantId(productVariantCreatePriceRequest.ProductVariantId as string)
      const productVariantPrice = new ProductPrice(
        productVariantCreatePriceRequest.DefaultPrice,
        productVariantCreatePriceRequest.SalePrice,
        productVariant
      )
      const result = await this.productVariantPriceRepository?.AddAsync<ProductPrice>([productVariantPrice])
      return result as boolean
    } catch (error) {
      console.log(error)
      return false
    }
  }

  private async getProductVariantId(productVariantId: string) : Promise<ProductVariant>
  { 
    try {
      this.productVariantRepository?.GetRepository(ProductVariant)
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