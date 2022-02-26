import { IProductItem } from "../../domain/product/IProductItem";
import { messages } from "../../helpers";
import InMemoryCreateProductController from "../../tests/product/InMemoryCreateProductController";
import InMemoryEditProductController from "../../tests/product/InMemoryEditProductController";
import InMemoryFileAdapterRepository from "../../tests/product/InMemoryFileAdapterRepository";
import CreateProductUseCase from "../createProduct/CreateProductUseCase";
import EditProductUseCase from "./EditProductUseCase";

describe("Edit Product Use Case", () => {
  const editedProduct: IProductItem = {
    name: "Product test edit",
    price: 22.1,
  };

  let inMemoryFileAdapter: InMemoryFileAdapterRepository;
  let createProductUseCase: CreateProductUseCase;
  let inMemoryCreateProductsController: InMemoryCreateProductController;
  let editProductUseCase: EditProductUseCase;
  let inMemoryEditProductsController: InMemoryEditProductController;

  beforeAll(() => {
    inMemoryFileAdapter = new InMemoryFileAdapterRepository();
    createProductUseCase = new CreateProductUseCase(inMemoryFileAdapter);
    inMemoryCreateProductsController = new InMemoryCreateProductController(
      createProductUseCase
    );
    editProductUseCase = new EditProductUseCase(inMemoryFileAdapter);
    inMemoryEditProductsController = new InMemoryEditProductController(
      editProductUseCase
    );
  });

  it("Should be able edit an product and return status 201", async () => {
    const newProduct = await inMemoryCreateProductsController
      .execute(editedProduct)
      .then((product) => product.newProduct);

    expect(
      await inMemoryEditProductsController
        .execute(newProduct as IProductItem)
        .then((product) => product.status)
    ).toBe(201);
  });

  it("Should be able not edit an product and return message error", async () => {
    const newProduct = await inMemoryCreateProductsController
      .execute(editedProduct)
      .then((product) => product.newProduct);

    expect(
      await inMemoryEditProductsController
        .execute(newProduct as IProductItem)
        .then((product) => product.error)
    ).toBe(messages("errorEdited"));
  });
});
