import InMemoryRepository from "../../infra/repositories/InMemoryRepository";
import InMemoryGetAllProductsController from "../../tests/product/InMemoryGetAllProductsController";
import GetAllProductsUseCase from "./GetAllProductsUseCase";

describe("Get All Products Use Case", () => {
  let inMemoryRepository: InMemoryRepository;
  let getAllProductsUseCase: GetAllProductsUseCase;
  let inMemoryGetAllProductsController: InMemoryGetAllProductsController;

  beforeAll(() => {
    inMemoryRepository = new InMemoryRepository();
    getAllProductsUseCase = new GetAllProductsUseCase(inMemoryRepository);
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
