import { IProduct } from "../../domain/product/IProduct";
import { IGetAllProducts } from "./IGetAllProducts";

export default class GetAllProductsUseCase implements IProduct {
  constructor(private _iGetAllProducts: IGetAllProducts) {}

  execute() {
    return this._iGetAllProducts.getAll();
  }
}
