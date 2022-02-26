import { IProductItem } from "../../domain/product/IProductItem";
import { logger, messages } from "../../helpers";
import {
  ICreateProduct,
  ICreateProductResponse,
} from "../../useCases/createProduct/ICreateProduct";
import {
  IDeleteProduct,
  IDeleteProductResponse,
} from "../../useCases/deleteProduct/IDeleteProduct";
import {
  IEditProduct,
  IEditProductResponse,
} from "../../useCases/editProduct/IEditProduct";
import {
  IGetAllProducts,
  IGetAllProductsResponse,
} from "../../useCases/getProducts/IGetAllProducts";

class InMemoryFileAdapterRepository
  implements IGetAllProducts, ICreateProduct, IEditProduct, IDeleteProduct
{
  private _productsList: IProductItem[];

  constructor() {
    this._productsList = [];
  }

  async getAll(): Promise<IGetAllProductsResponse> {
    try {
      return {
        status: 200,
        message: messages("productListed"),
        products: this._productsList,
      };
    } catch (error) {
      return {
        error: messages("errorListed"),
      };
    }
  }

  async create(product: IProductItem): Promise<ICreateProductResponse> {
    try {
      if (
        this._productsList.find(
          (productItem) => productItem._id === product._id
        )
      ) {
        logger(messages("errorCreated"));
        return {
          error: messages("errorCreated"),
        };
      }

      this._productsList.push(product);

      return {
        status: 201,
        message: messages("productCreated"),
        newProduct: product,
      };
    } catch (error) {
      return {
        error: messages("errorCreated"),
      };
    }
  }

  async edit(product: IProductItem): Promise<IEditProductResponse> {
    try {
      const copyProductList = [...this._productsList];
      const productIndex = copyProductList.findIndex(
        (copyProduct) => copyProduct._id === product._id
      );

      if (
        copyProductList.some((productItem) => productItem._id !== product._id)
      ) {
        logger(messages("errorEdited"));
        return {
          error: messages("errorEdited"),
        };
      }

      copyProductList.splice(productIndex, 1, product);

      return {
        status: 201,
        message: messages("productEdited"),
        product,
      };
    } catch (error) {
      return {
        error: messages("productEdited"),
      };
    }
  }

  async delete(product: IProductItem): Promise<IDeleteProductResponse> {
    try {
      const copyProductList = [...this._productsList];
      const productIndex = this._productsList.findIndex(
        (copyProduct) => copyProduct._id === product._id
      );

      if (
        copyProductList.some((productItem) => productItem._id !== product._id)
      ) {
        return {
          error: messages("errorRemoved"),
        };
      }

      copyProductList.splice(productIndex, 1);

      return {
        status: 200,
        message: messages("productRemoved"),
        productId: product._id,
      };
    } catch (error) {
      return {
        error: messages("errorRemoved"),
      };
    }
  }
}

export default InMemoryFileAdapterRepository;
