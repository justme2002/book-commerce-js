import { Cart } from "../../DAL/Entities/Cart";
import { Customer } from "../../DAL/Entities/Customer";
import { ProductVariant } from "../../DAL/Entities/ProductVariant";

export class AddToCartRequest
{
  constructor(public Customer?: Customer,
    public Quantity?: number,
    public ProductVariant?: ProductVariant,
    public Cart?: Cart)
  {

  }
}