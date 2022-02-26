import { Request, Response } from "express";
import { logger } from "../../../helpers";
import EditProductUseCase from "../../../useCases/editProduct/EditProductUseCase";
import { IEditProductResponse } from "../../../useCases/editProduct/IEditProduct";

class EditProductController {
  constructor(private _editProductUseCase: EditProductUseCase) {}

  async execute(
    request: Request,
    response: Response
  ): Promise<Response<IEditProductResponse>> {
    const { params, body } = request;
    const { name, price } = body;
    const { id } = params;

    const productSelected = {
      _id: id,
      name,
      price,
    };

    const isProductEdited = await this._editProductUseCase.execute(
      productSelected
    );

    if (isProductEdited?.error) {
      return response.json({ error: isProductEdited.error });
    }

    logger("Product Edited Successfully");

    return response.json({
      status: 201,
      message: "Product Edited Successfully",
      product: productSelected,
    });
  }
}

export { EditProductController };
