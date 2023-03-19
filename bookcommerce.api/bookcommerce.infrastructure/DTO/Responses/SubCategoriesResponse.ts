import { SubCategory } from "../../DAL/Entities/SubCategory";
import { BaseResponse } from "./BaseResponse";

export class SubCategoriesResponse extends BaseResponse
{
  public SubCategories?: SubCategory[]
  constructor({ status, message, subCategories }: { status?: boolean, message?: string, subCategories?: SubCategory[]})
  {
    super({ status, message })
    this.SubCategories = subCategories
  }
}