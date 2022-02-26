import { IProductItem } from "../../domain/product/IProductItem";
import { messages } from "../../helpers";
import InMemoryCreateProductController from "../../tests/product/InMemoryCreateProductController";
import InMemoryFileAdapterRepository from "../../tests/product/InMemoryFileAdapterRepository";
import CreateProductUseCase from "./CreateProductUseCase";

describe("Create New Product Use Case", () => {
  const newProduct: IProductItem = {
    name: "New Product",
    price: 22.2,
  };

  const newProductWithId: IProductItem = {
    _id: "123",
    name: "New Product",
    price: 22.2,
  };

  let inMemoryFileAdapter: InMemoryFileAdapterRepository;
  let createProductUseCase: CreateProductUseCase;
  let inMemoryCreateProductsController: InMemoryCreateProductController;

  beforeAll(() => {
    inMemoryFileAdapter = new InMemoryFileAdapterRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryFileAdapter);
    inMemoryCreateProductsController = new InMemoryCreateProductController(
      createProductUseCase
    );
  });

  it("Should be able create an product and _id return", async () => {
    expect(
      await inMemoryCreateProductsController
        .execute(newProduct)
        .then((product) => product.newProduct)
    ).toHaveProperty("_id");
  });

  it("Should be able create an product and return status equal 201", async () => {
    expect(
      await inMemoryCreateProductsController
        .execute(newProduct)
        .then((product) => product.status)
    ).toEqual(201);
  });

  it("Should be able not create an product and return error", async () => {
    await inMemoryCreateProductsController.execute(newProductWithId);
    expect(
      await inMemoryCreateProductsController
        .execute(newProductWithId)
        .then((product) => product.error)
    ).toEqual(messages("errorCreated"));
  });
});
