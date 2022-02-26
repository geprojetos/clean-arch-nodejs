import { IProductItem } from "../../domain/product/IProductItem";
import Product from "../../domain/product/Product";
import { ICreateProductResponse } from "../../infra/controllers/product/CreateProductController";
import CreateProductUseCase from "../../useCases/createProduct/CreateProductUseCase";

class InMemoryCreateProductController {
  constructor(private _createProductUseCase: CreateProductUseCase) {}

  async execute(request: IProductItem): Promise<ICreateProductResponse> {
    const { _id, name, price } = request;
    const newProduct = new Product({
      _id,
      name,
      price,
    });
    const isProductCreated = await this._createProductUseCase.execute(
      newProduct
    );

    if (isProductCreated?.error) {
      return {
        error: isProductCreated.error,
      };
    }

    return {
      status: 201,
      message: "Product Created Successfully",
      newProduct,
    };
  }
}

export default InMemoryCreateProductController;
