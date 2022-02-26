import { IProduct } from "../../domain/product/IProduct";
import { IProductItem } from "../../domain/product/IProductItem";
import { IEditProduct, IEditProductResponse } from "./IEditProduct";

class EditProductUseCase implements IProduct {
  constructor(private _iEditProduct: IEditProduct) {}

  execute(product: IProductItem): Promise<IEditProductResponse> {
    return this._iEditProduct.edit(product);
  }
}

export default EditProductUseCase;
