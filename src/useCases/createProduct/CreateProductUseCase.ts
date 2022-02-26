import { IProduct } from "../../domain/product/IProduct";
import { IProductItem } from "../../domain/product/IProductItem";
import { ICreateProduct } from "./ICreateProduct";

class CreateProductUseCase implements IProduct {
  constructor(private _iCreateProduct: ICreateProduct) {}

  execute(product?: IProductItem) {
    return this._iCreateProduct.create(product);
  }
}

export default CreateProductUseCase;
