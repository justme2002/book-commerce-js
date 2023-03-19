import { Category } from "../../bookcommerce.infrastructure/DAL/Entities/Category"
import { CategoryRequest } from "../../bookcommerce.infrastructure/DTO/requests/CategoryRequest"

export interface ICategoryService
{
  createCategory(categoryRequest: CategoryRequest): Promise<boolean | undefined>
  updateCategoryName(): boolean
  getCategoryById(id: string): Promise<Category | undefined>
}