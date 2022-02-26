import { IProductItem } from "../../domain/product/IProductItem";
import EditProductUseCase from "../../useCases/editProduct/EditProductUseCase";
import { IEditProductResponse } from "../../useCases/editProduct/IEditProduct";

class InMemoryEditProductController {
  constructor(private _editProductUseCase: EditProductUseCase) {}

  async execute(request: IProductItem): Promise<IEditProductResponse> {
    const { _id, name, price } = request;

    const productSelected = {
      _id,
      name,
      price,
    };

    const isProductEdited = await this._editProductUseCase.execute(
      productSelected
    );

    if (isProductEdited?.error) {
      return { error: isProductEdited.error };
    }

    return {
      status: 201,
      message: "Product Edited Successfully",
      product: productSelected,
    };
  }
}

export default InMemoryEditProductController;
