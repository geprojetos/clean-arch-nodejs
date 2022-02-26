import { Request, Response } from "express";
import { logger } from "../../../helpers";
import GetAllProductsUseCase from "../../../useCases/getProducts/GetAllProductsUseCase";

class GetAllProductsController {
  constructor(private getAllProductsUseCase: GetAllProductsUseCase) {}

  async execute(request: Request, response: Response) {
    try {
      const products = await this.getAllProductsUseCase.execute();

      logger(`Products Listed Successfully`);

      return response.json({
        status: 200,
        message: "Products Listed Successfully",
        products,
      });
    } catch (error) {
      return response.json({
        error,
      });
    }
  }
}

export default GetAllProductsController;
