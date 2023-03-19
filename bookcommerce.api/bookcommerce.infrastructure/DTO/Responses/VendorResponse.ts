import { Vendor } from "../../DAL/Entities/Vendor";
import { BaseResponse } from "./BaseResponse";

export class VendorResponse extends BaseResponse
{
  public Vendor?: Vendor
  constructor({ status, message, vendor }: { status: boolean, message: string, vendor: Vendor })
  {
    super({ status, message })
    this.Vendor = vendor
  }
}