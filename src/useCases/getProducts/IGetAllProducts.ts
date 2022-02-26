import { IProductItem } from "../../domain/product/IProductItem";

interface IGetAllProductsResponse {
  status?: number;
  error?: string | unknown;
  message?: string;
  products?: IProductItem[];
}

interface IGetAllProducts {
  getAll(): Promise<IGetAllProductsResponse>;
}

export { IGetAllProducts, IGetAllProductsResponse };
