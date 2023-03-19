import { ProductVariantCreatePriceRequest } from "../../bookcommerce.infrastructure/DTO/requests/ProductVariantCreatePriceRequest";

export interface IProductVariantPriceService
{
  CreateProductVariantPrice(product: ProductVariantCreatePriceRequest): Promise<boolean>
}