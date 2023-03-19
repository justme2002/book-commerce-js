import { Product } from "../../bookcommerce.infrastructure/DAL/Entities/Product";
import { ProductVariant } from "../../bookcommerce.infrastructure/DAL/Entities/ProductVariant";

export interface IImageService
{ 
  UploadFile(product?: Product, file?: any): Promise<boolean>
}