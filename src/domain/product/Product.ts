import { IProductItem } from "./IProductItem";

export default class Product {
  public _id!: string;
  public name!: string;
  public price!: number;

  constructor(props: IProductItem) {
    Object.assign(this, props);

    if (!props._id) {
      this._id = `${Math.floor(Math.random() * 9999)}-${Math.floor(
        Math.random() * 9999
      )}`;
    }
  }
}
