import { IProductItem } from "../../domain/product/IProductItem";

interface IEditProductResponse {
  status?: number;
  message?: string;
  product?: IProductItem;
  error?: string | undefined | unknown;
}

interface IEditProduct {
  edit(product: IProductItem): Promise<IEditProductResponse>;
}

export { IEditProduct, IEditProductResponse };
