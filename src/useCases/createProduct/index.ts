import FileAdapterRepository from "../../infra/repositories/FileAdapterRepository";
import CreateProductController from "../../infra/controllers/product/CreateProductController";
import CreateProductUseCase from "./CreateProductUseCase";

const fileAdapter = new FileAdapterRepository();
const createProductUseCase = new CreateProductUseCase(fileAdapter);
const createProductController = new CreateProductController(
  createProductUseCase
);

export { createProductController };
