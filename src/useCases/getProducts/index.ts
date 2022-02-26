import FileAdapterRepository from "../../infra/repositories/FileAdapterRepository";
import GetAllProductsController from "../../infra/controllers/product/GetAllProductsController";
import GetAllProductsUseCase from "./GetAllProductsUseCase";

const dataBaseFile = new FileAdapterRepository();
const getAllProductsUseCase = new GetAllProductsUseCase(dataBaseFile);
const getAllController = new GetAllProductsController(getAllProductsUseCase);

export { getAllController };
