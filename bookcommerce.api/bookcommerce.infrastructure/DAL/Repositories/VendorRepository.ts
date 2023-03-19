import { BaseRepository } from "../BaseRepository";
import { Vendor } from "../Entities/Vendor";
import { IVendorRepository } from "../Interfaces/IVendorRepository";

export class VendorRepository extends BaseRepository implements IVendorRepository
{
  constructor()
  {
    super()
  }

  public createProfile(vendor: Vendor): boolean {
    this.GetRepository(Vendor)
    if (!vendor) return false
    this.Add([vendor])
    return true
  }

  public async viewProfile(VendorId: string): Promise<Vendor> {
    this.GetRepository(Vendor)
    var result = await this.GetOneBy({
      VendorId 
    })
    return result as Vendor
  }

  public async getVendorByAccountId(accountId: string): Promise<Vendor> {
    this.GetRepository(Vendor)
    var result = await this.GetOneBy({
      Account: {
        AccountId: accountId
      }
    })
    return result as Vendor
  }

  updateProfile(): boolean {
    throw new Error("Method not implemented.");
  }
}