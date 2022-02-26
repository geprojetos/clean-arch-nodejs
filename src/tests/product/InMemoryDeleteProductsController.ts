import { IProductItem } from "../../domain/product/IProductItem";
import DeleteProductUseCase from "../../useCases/deleteProduct/DeleteProductUseCase";
import { IDeleteProductResponse } from "../../useCases/deleteProduct/IDeleteProduct";

class InMemoryDeleteProductsController {
  constructor(private _deleteProductUseCase: DeleteProductUseCase) {}

  async execute(request: IProductItem): Promise<IDeleteProductResponse> {
    const { _id, name, price } = request;
    const productSelected = {
      _id,
      name,
      price,
    };

    const isProductRemoved = await this._deleteProductUseCase.execute(
      productSelected
    );

    if (isProductRemoved?.error) {
      return {
        error: isProductRemoved.error,
      };
    }

    return {
      status: 200,
      message: "Product removed successfully",
      productId: _id,
    };
  }
}

export default InMemoryDeleteProductsController;
