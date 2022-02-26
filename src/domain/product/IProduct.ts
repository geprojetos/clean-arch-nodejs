import { IProductItem } from "./IProductItem";

interface IProduct {
  execute(product?: IProductItem | undefined): void;
}

export { IProduct };
