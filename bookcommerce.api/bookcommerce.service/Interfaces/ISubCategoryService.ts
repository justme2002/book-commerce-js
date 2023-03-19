import { SubCategoryRequest } from "../../bookcommerce.infrastructure/DTO/requests/SubCategoryRequest";

export interface ISubCategoryService
{
  createSubCategory(subCategoryRequest: SubCategoryRequest, categoryId: string, vendorId: string): Promise<boolean | undefined>
}