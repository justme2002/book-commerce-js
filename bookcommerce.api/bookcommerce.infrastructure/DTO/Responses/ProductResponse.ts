import { Product } from "../../DAL/Entities/Product";
import { BaseResponse } from "./BaseResponse";

export class ProductResponse extends BaseResponse
{
  public products?: Product[]
  constructor({ status, message, products }: { status?: boolean, message?: string, products?: Product[] })
  {
    super({ status, message })
    this.products = products
  }
}