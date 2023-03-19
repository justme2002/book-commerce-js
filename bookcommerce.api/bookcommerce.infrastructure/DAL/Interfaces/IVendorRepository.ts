import { Vendor } from "../Entities/Vendor"

export interface IVendorRepository
{
  createProfile(vendor: Vendor) : boolean
  viewProfile(vendorId: string): Promise<Vendor>
  updateProfile(): boolean
  getVendorByAccountId(accountId: string): Promise<Vendor>
}