import { Account } from "../../DAL/Entities/Account";

export class VendorCreationRequest
{
  constructor(
    public vendorName?: string, 
  ) {}
}