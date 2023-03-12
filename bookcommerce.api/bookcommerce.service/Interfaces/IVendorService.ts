import { Vendor } from "../../bookcommerce.infrastructure/DAL/Entities/Vendor"
import { VendorCreationRequest } from "../../bookcommerce.infrastructure/DTO/requests/VendorCreationRequest"

export interface IVendorService
{
  createProfile(vendorCreationRequest: VendorCreationRequest, accountId: string): Promise<boolean>
  viewProfile(): Vendor
  updateProfile(): boolean
}