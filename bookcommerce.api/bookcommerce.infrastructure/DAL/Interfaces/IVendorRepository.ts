import { Vendor } from "../Entities/Vendor"

export interface IVendorRepository
{
  createProfile(vendor: Vendor) : boolean
  viewProfile(): Vendor
  updateProfile(): boolean
}