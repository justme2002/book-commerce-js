import { Product } from "../../bookcommerce.infrastructure/DAL/Entities/Product";
import { ProductRequest } from "../../bookcommerce.infrastructure/DTO/requests/ProductRequest";

export interface IProductService
{
  createProduct(ProductRequest?: ProductRequest, subCategoryId?: string, accountId?: string): Promise<boolean>
  getAllProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product>
  updateProduct(): Promise<boolean>
}