export class ProductRequest
{
  public ProductName?: string
  public ProductDescription?: string
  public Author?: string
  public Images?: Express.Multer.File[]
  constructor(ProductName?: string, ProductDescription?: string, Author?: string, Images?: Express.Multer.File[])
  {
    this.ProductName = ProductName
    this.ProductDescription = ProductDescription
    this.Author = Author
    this.Images = Images
  }
}