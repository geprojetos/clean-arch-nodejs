import { Request, Response } from "express";
import { IProductItem } from "../../../domain/product/IProductItem";
import Product from "../../../domain/product/Product";
import { logger } from "../../../helpers";
import CreateProductUseCase from "../../../useCases/createProduct/CreateProductUseCase";
import { ICreateProductResponse } from "../../../useCases/createProduct/ICreateProduct";

class CreateProductController {
  constructor(private _createProductUseCase: CreateProductUseCase) {}

  async execute(
    request: Request,
    response: Response
  ): Promise<Response<ICreateProductResponse>> {
    const { body } = request;
    const { _id, name, price } = body;
    const newProduct = new Product({
      _id,
      name,
      price,
    });
    const isProductCreated = await this._createProductUseCase.execute(
      newProduct
    );

    if (isProductCreated?.error) {
      return response.json({
        error: isProductCreated.error,
      });
    }

    logger("Product Created Successfully");

    return response.json({
      status: 201,
      message: "Product Created Successfully",
      newProduct,
    });
  }
}

export default CreateProductController;
export { ICreateProductResponse };
