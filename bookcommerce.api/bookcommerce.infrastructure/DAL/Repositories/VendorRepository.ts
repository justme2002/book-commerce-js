import { BaseRepository } from "../BaseRepository";
import { Vendor } from "../Entities/Vendor";
import { IVendorRepository } from "../Interfaces/IVendorRepository";

export class VendorRepository extends BaseRepository implements IVendorRepository
{
  constructor()
  {
    super()
  }
  createProfile(vendor: Vendor): boolean {
    this.GetRepository(Vendor)
    if (!vendor) return false
    this.Add([vendor])
    return true
  }
  viewProfile(): Vendor {
    throw new Error("Method not implemented.");
  }
  updateProfile(): boolean {
    throw new Error("Method not implemented.");
  }

}