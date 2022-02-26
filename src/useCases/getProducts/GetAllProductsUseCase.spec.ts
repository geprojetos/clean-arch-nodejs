import InMemoryFileAdapterRepository from "../../tests/product/InMemoryFileAdapterRepository";
import InMemoryGetAllProductsController from "../../tests/product/InMemoryGetAllProductsController";
import GetAllProductsUseCase from "./GetAllProductsUseCase";

describe("Get All Products Use Case", () => {
  let inMemoryFileAdapter: InMemoryFileAdapterRepository;
  let getAllProductsUseCase: GetAllProductsUseCase;
  let inMemoryGetAllProductsController: InMemoryGetAllProductsController;

  beforeAll(() => {
    inMemoryFileAdapter = new InMemoryFileAdapterRepository();
    getAllProductsUseCase = new GetAllProductsUseCase(inMemoryFileAdapter);
    inMemoryGetAllProductsController = new InMemoryGetAllProductsController(
      getAllProductsUseCase
    );
  });

  it("Should be able get all products and return empty array", async () => {
    expect(
      await inMemoryGetAllProductsController
        .execute()
        .then((response) => response.products?.products)
    ).toEqual([]);
  });

  it("Should be able get status equal 200", async () => {
    expect(
      await inMemoryGetAllProductsController
        .execute()
        .then((response) => response.status)
    ).toBe(200);
  });
});
