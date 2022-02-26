import FileAdapterRepository from "../../infra/repositories/FileAdapterRepository";
import DeleteProductController from "../../infra/controllers/product/DeleteProductController";
import DeleteProductUseCase from "./DeleteProductUseCase";

const fileAdapter = new FileAdapterRepository();
const deleteProductUseCase = new DeleteProductUseCase(fileAdapter);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase
);

export { deleteProductController };
