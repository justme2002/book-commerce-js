export class ProductVariantRequest
{
  public ProductVariantName?: string
  public ProductVariantQuantity?: number
  public ProductId?: string
  public Images?: Express.Multer.File[]

  constructor(ProductVariantName?: string, ProductVariantQuantity?: number, ProductId?: string, Images?: Express.Multer.File[])
  {
    this.ProductVariantName = ProductVariantName
    this.ProductVariantQuantity = ProductVariantQuantity
    this.ProductId = ProductId
    this.Images = Images
  }
}