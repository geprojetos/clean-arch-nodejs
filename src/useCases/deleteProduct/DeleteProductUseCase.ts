import { IProduct } from "../../domain/product/IProduct";
import { IProductItem } from "../../domain/product/IProductItem";
import { IDeleteProduct, IDeleteProductResponse } from "./IDeleteProduct";

class DeleteProductUseCase implements IProduct {
  constructor(private _iDeleteProduct: IDeleteProduct) {}

  execute(product: IProductItem): Promise<IDeleteProductResponse> {
    return this._iDeleteProduct.delete(product);
  }
}

export default DeleteProductUseCase;
