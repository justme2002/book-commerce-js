import { Category } from "../bookcommerce.infrastructure/DAL/Entities/Category";
import { SubCategory } from "../bookcommerce.infrastructure/DAL/Entities/SubCategory";
import { Vendor } from "../bookcommerce.infrastructure/DAL/Entities/Vendor";
import { SubCategoryRepository } from "../bookcommerce.infrastructure/DAL/Repositories/SubCategoryRepository";
import { VendorRepository } from "../bookcommerce.infrastructure/DAL/Repositories/VendorRepository";
import { SubCategoryRequest } from "../bookcommerce.infrastructure/DTO/requests/SubCategoryRequest";
import { CategoryService } from "./CategoryService";
import { ISubCategoryService } from "./Interfaces/ISubCategoryService";

export class SubCategoryService implements ISubCategoryService
{
  constructor(private readonly subCategoryRepository?: SubCategoryRepository, 
    private readonly categoryService?: CategoryService,
    private readonly vendorRepository?: VendorRepository
  )
  {

  }

  public async createSubCategory(subCategoryRequest: SubCategoryRequest, categoryId?: string, vendorId?: string): Promise<boolean | undefined> {
    try {
      this.subCategoryRepository?.GetRepository(SubCategory)
      const category = await this.getCategory(categoryId!)
      if (!category) return false
      const vendor = await this.getVendor(vendorId!)
      if (!vendor) return false
      console.log()
      const subCategory = new SubCategory(
        subCategoryRequest.CategoryName,
        category,
        vendor
      )
      const result = await this.subCategoryRepository?.AddAsync([subCategory])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  private async getCategory(id: string) : Promise<Category | undefined>
  {
    try {
      const result = await this.categoryService!.getCategoryById(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  private async getVendor(id: string) : Promise<Vendor | undefined>
  {
    try {
      const result = await this.vendorRepository?.getVendorByAccountId(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}