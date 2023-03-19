import { Repository } from "typeorm";
import { Category } from "../bookcommerce.infrastructure/DAL/Entities/Category";
import { CategoryRepository } from "../bookcommerce.infrastructure/DAL/Repositories/CategoryRepository";
import { CategoryRequest } from "../bookcommerce.infrastructure/DTO/requests/CategoryRequest";
import { ICategoryService } from "./Interfaces/ICategoryService";

export class CategoryService implements ICategoryService
{
  constructor(private readonly categoryRepository?: CategoryRepository)
  {

  }
  public async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      this.categoryRepository?.GetRepository(Category)
      const result = await this.categoryRepository?.GetOneBy({
        "categoryId": id
      })
      if (!result) return new Category()
      return result as Category
    } catch (error) {
      console.log(error)
    }
  }

  public async createCategory(categoryRequest: CategoryRequest): Promise<boolean | undefined> {
    try {
      this.categoryRepository?.GetRepository(Category)
      const category = new Category(categoryRequest.categoryName)
      if (!CategoryRequest) return false
      const result = this.categoryRepository?.AddAsync([category])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  public updateCategoryName(): boolean {
    throw new Error("Method not implemented.");
  }
}