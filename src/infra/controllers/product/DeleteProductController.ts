import { Request, Response } from "express";
import { logger } from "../../../helpers";
import DeleteProductUseCase from "../../../useCases/deleteProduct/DeleteProductUseCase";
import { IDeleteProductResponse } from "../../../useCases/deleteProduct/IDeleteProduct";

class DeleteProductController {
  constructor(private _deleteProductUseCase: DeleteProductUseCase) {}

  async execute(
    request: Request,
    response: Response
  ): Promise<Response<IDeleteProductResponse>> {
    const { body, params } = request;
    const { name, price } = body;
    const { id } = params;
    const productSelected = {
      id,
      name,
      price,
    };

    const isProductRemoved = await this._deleteProductUseCase.execute(
      productSelected
    );

    if (isProductRemoved?.error) {
      return response.json({
        error: isProductRemoved.error,
      });
    }

    logger("Product Removed Successfully");

    return response.json({
      status: 200,
      message: "Product removed successfully",
      productId: id,
    });
  }
}

export default DeleteProductController;
