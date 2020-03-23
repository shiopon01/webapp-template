import * as supertest from "supertest";
import { app } from "../src/app";
import { echo } from "../src/echo";

let request: supertest.SuperTest<supertest.Test>;
beforeAll(() => {
  request = supertest(app);
});

/**
 * integration test
 */
describe("GET /echo", () => {
  it('should return a string same as "say" query param', (): {} => {
    const say: string = "Aa 1あ";

    return request
      .get("/echo")
      .query({ say: say })
      .expect(200, say);
  });

  it('is bad request that "say" query param is not given', (): {} => {
    return request.get("/echo").expect(400);
  });
});

/**
 * unit test
 */
describe("echo", () => {
  it("should return a string same as input", () => {
    const say: string = "Aa 1あ";
    expect(echo(say)).toBe(say);
  });
});
