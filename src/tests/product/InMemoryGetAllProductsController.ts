import GetAllProductsUseCase from "../../useCases/getProducts/GetAllProductsUseCase";

class InMemoryGetAllProductsController {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  async execute() {
    try {
      const products = await this.getAllProductsUseCase.execute();

      return {
        status: 200,
        message: "Products Listed Successfully",
        products,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default InMemoryGetAllProductsController;
