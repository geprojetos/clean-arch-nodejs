import { readFile, writeFile } from "fs";
import { join } from "path";
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

class FileAdapterRepository
  implements IGetAllProducts, ICreateProduct, IEditProduct, IDeleteProduct
{
  private _productsList: IProductItem[];
  private _path = join(__dirname, "..", "..", "database", "products.json");

  constructor() {
    this._productsList = [];
    this.readFileHelper();
  }

  async getAll(): Promise<IGetAllProductsResponse> {
    try {
      this.readFileHelper();

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
      this.saveProductFileHelper(this._productsList);

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
      this.saveProductFileHelper(copyProductList);

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
      this.saveProductFileHelper(copyProductList);

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

  private readFileHelper() {
    readFile(this._path, (error, data) => {
      if (error) {
        throw new Error(error.message);
      }

      this._productsList = JSON.parse(data?.toString() || "[]");
    });
  }

  private saveProductFileHelper(newProductsList: IProductItem[]) {
    writeFile(this._path, JSON.stringify(newProductsList), (error) => {
      if (error) {
        throw new Error("Error on save products in file");
      }
    });
  }
}

export default FileAdapterRepository;
