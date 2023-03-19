import { BaseResponse } from "../../bookcommerce.infrastructure/DTO/Responses/BaseResponse";

export interface ICartService
{
  AddProductVariantToCart(): Promise<BaseResponse>
  UpdateQuantityInCart(productVariantId?: string): Promise<boolean>
  DeleteProductInCart(productVariantId?: string): Promise<boolean>
}