import { Vendor } from "../bookcommerce.infrastructure/DAL/Entities/Vendor";
import { IAccountRepository } from "../bookcommerce.infrastructure/DAL/Interfaces/IAccountRepository";
import { IVendorRepository } from "../bookcommerce.infrastructure/DAL/Interfaces/IVendorRepository";
import { VendorCreationRequest } from "../bookcommerce.infrastructure/DTO/requests/VendorCreationRequest";
import { IVendorService } from "./Interfaces/IVendorService";

export class VendorService implements IVendorService
{
  constructor(private readonly vendorRepository: IVendorRepository, private readonly accountRepository: IAccountRepository)
  {


  }

  public async createProfile(vendorCreationRequest: VendorCreationRequest, accountId: string): Promise<boolean> {
    try {
      if (!accountId) return false
      const account = await this.accountRepository.getAccountId(accountId)
      if (!vendorCreationRequest) return false
      const vendor = new Vendor(
        vendorCreationRequest.vendorName,
        account
      )
      this.vendorRepository.createProfile(vendor)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
  viewProfile(): Vendor {
    throw new Error("Method not implemented.");
  }
  updateProfile(): boolean {
    throw new Error("Method not implemented.");
  }

}