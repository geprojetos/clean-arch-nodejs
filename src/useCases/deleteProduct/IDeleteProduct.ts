import { IProductItem } from "../../domain/product/IProductItem";

interface IDeleteProductResponse {
  status?: number;
  error?: string | unknown;
  message?: string;
  productId?: string;
}

interface IDeleteProduct {
  delete(product: IProductItem): Promise<IDeleteProductResponse>;
}

export { IDeleteProduct, IDeleteProductResponse };
