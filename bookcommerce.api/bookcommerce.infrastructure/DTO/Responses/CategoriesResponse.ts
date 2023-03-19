import { Category } from "../../DAL/Entities/Category";
import { BaseResponse } from "./BaseResponse";

export class CategoriesResponse extends BaseResponse
{
  public Categories?: Category[]
  constructor({ status, message, categories }: { status?: boolean, message?: string, categories?: Category[] })
  {
    super({ status, message })
    this.Categories = categories
  }
}