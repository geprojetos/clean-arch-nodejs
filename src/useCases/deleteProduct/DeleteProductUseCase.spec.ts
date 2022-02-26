import { IProductItem } from "../../domain/product/IProductItem";
import { messages } from "../../helpers";
import InMemoryCreateProductController from "../../tests/product/InMemoryCreateProductController";
import InMemoryDeleteProductsController from "../../tests/product/InMemoryDeleteProductsController";
import InMemoryFileAdapterRepository from "../../tests/product/InMemoryFileAdapterRepository";
import CreateProductUseCase from "../createProduct/CreateProductUseCase";
import DeleteProductUseCase from "./DeleteProductUseCase";

describe("Delete Product Use Case", () => {
  const product: IProductItem = {
    name: "Product delete",
    price: 22.5,
  };
  let inMemoryFileAdapter: InMemoryFileAdapterRepository;
  let createProductUseCase: CreateProductUseCase;
  let inMemoryCreateProductsController: InMemoryCreateProductController;
  let deleteProductUseCase: DeleteProductUseCase;
  let inMemoryDeleteProductsController: InMemoryDeleteProductsController;

  beforeAll(() => {
    inMemoryFileAdapter = new InMemoryFileAdapterRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryFileAdapter);
    inMemoryCreateProductsController = new InMemoryCreateProductController(
      createProductUseCase
    );
    deleteProductUseCase = new DeleteProductUseCase(inMemoryFileAdapter);
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
