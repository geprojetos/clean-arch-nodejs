import { IProductItem } from "../../domain/product/IProductItem";

interface ICreateProductResponse {
  status?: number;
  error?: string | unknown;
  message?: string;
  newProduct?: IProductItem;
}

interface ICreateProduct {
  create(product: IProductItem | undefined): Promise<ICreateProductResponse>;
}

export { ICreateProduct, ICreateProductResponse };
