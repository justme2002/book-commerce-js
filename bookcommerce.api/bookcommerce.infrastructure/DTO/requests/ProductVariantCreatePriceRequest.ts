export class ProductVariantCreatePriceRequest
{
  public DefaultPrice?: number
  public SalePrice?: number
  public ProductVariantId?: string
  public SaleDate?: Date
  public ExpiredSaleDate?: Date
  constructor(DefaultPrice?: number, SalePrice?: number, ProductVariantId?: string, SaleDate?: Date, ExpiredSaleDate?: Date)
  {
    this.DefaultPrice = DefaultPrice
    this.SalePrice = SalePrice
    this.ProductVariantId = ProductVariantId
    this.SaleDate = SaleDate
    this.ExpiredSaleDate = ExpiredSaleDate
  }
}