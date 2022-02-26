import { Router } from "express";
import { Request, Response } from "express";
import { createProductController } from "./useCases/createProduct";
import { deleteProductController } from "./useCases/deleteProduct";
import { editProductController } from "./useCases/editProduct";
import { getAllController } from "./useCases/getProducts";

const router = Router();

router.get("/products", async (request: Request, response: Response) => {
  return getAllController.execute(request, response);
});

router.post("/products", async (request: Request, response: Response) => {
  return createProductController.execute(request, response);
});

router.patch("/products/:id", async (request: Request, response: Response) => {
  return editProductController.execute(request, response);
});

router.delete("/products/:id", async (request: Request, response: Response) => {
  return deleteProductController.execute(request, response);
});

export { router };
