import { ProductVariant } from "../../bookcommerce.infrastructure/DAL/Entities/ProductVariant";
import { ProductVariantRequest } from "../../bookcommerce.infrastructure/DTO/requests/ProductVariantRequest";
import { ProductVariantUpdateQuantityRequest } from "../../bookcommerce.infrastructure/DTO/requests/ProductVariantUpdateQuantityRequest";

export interface IProductVariantService
{
  CreateVariant(ProductVariantRequest?: ProductVariantRequest): Promise<boolean | undefined>
  UpdateVariantName(productVariantUpdateQuantityRequest: ProductVariantUpdateQuantityRequest): Promise<boolean | undefined>
  UpdateVariantQuantity(productVariantUpdateQuantityRequest: ProductVariantUpdateQuantityRequest): Promise<boolean | undefined>
  GetProductVariantsByProductId(productId: string): Promise<ProductVariant[] | undefined>
}