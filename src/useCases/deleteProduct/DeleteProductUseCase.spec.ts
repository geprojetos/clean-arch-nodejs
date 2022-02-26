import { IProductItem } from "../../domain/product/IProductItem";
import { messages } from "../../helpers";
import InMemoryRepository from "../../infra/repositories/InMemoryRepository";
import InMemoryCreateProductController from "../../tests/product/InMemoryCreateProductController";
import InMemoryDeleteProductsController from "../../tests/product/InMemoryDeleteProductsController";
import CreateProductUseCase from "../createProduct/CreateProductUseCase";
import DeleteProductUseCase from "./DeleteProductUseCase";

describe("Delete Product Use Case", () => {
  const product: IProductItem = {
    name: "Product delete",
    price: 22.5,
  };
  let inMemoryRepository: InMemoryRepository;
  let createProductUseCase: CreateProductUseCase;
  let inMemoryCreateProductsController: InMemoryCreateProductController;
  let deleteProductUseCase: DeleteProductUseCase;
  let inMemoryDeleteProductsController: InMemoryDeleteProductsController;

  beforeAll(() => {
    inMemoryRepository = new InMemoryRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryRepository);
    inMemoryCreateProductsController = new InMemoryCreateProductController(
      createProductUseCase
    );
    deleteProductUseCase = new DeleteProductUseCase(inMemoryRepository);
    inMemoryDeleteProductsController = new InMemoryDeleteProductsController(
      deleteProductUseCase
    );
  });

  it("Should be able delete an product return status 200", async () => {
    const productRemoved = await inMemoryCreateProductsController
      .execute(product)
      .then((product) => product.newProduct);

    expect(
      await (
        await inMemoryDeleteProductsController.execute(
          productRemoved as IProductItem
        )
      ).status
    ).toBe(200);
  });

  it("Should be able not delete an product return message error", async () => {
    expect(
      await (
        await inMemoryDeleteProductsController.execute(product)
      ).error
    ).toBe(messages("errorRemoved"));
  });
});
