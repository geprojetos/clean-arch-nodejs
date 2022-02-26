import FileAdapterRepository from "../../infra/repositories/FileAdapterRepository";
import { EditProductController } from "../../infra/controllers/product/EditProductController";
import EditProductUseCase from "./EditProductUseCase";

const fileAdapter = new FileAdapterRepository();
const editProductUseCase = new EditProductUseCase(fileAdapter);
const editProductController = new EditProductController(editProductUseCase);

export { editProductController };
