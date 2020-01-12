import { storageAPI } from "./storageAPI";
import { stub } from "sinon";
describe("Storage API test", () => {
  describe("get method", () => {
    it("return of method get when correct type is passed", () => {
      const tokenValue = "123vjh122biuv1273";
      const tokenKey = "token";
      const storage = {
        getItem: stub()
          .withArgs(tokenKey)
          .returns(tokenValue)
      };

      const storageAPInstance = storageAPI(storage);
      const actualValue = storageAPInstance.get(tokenKey);

      expect(actualValue).toBe(tokenValue);
    });
  });

  describe("set method", () => {
    it("return of method set when correct type is passed", () => {
      const tokenValue = "123vjh122biuv1273";
      const tokenKey = "token";
      const storage = {
        setItem: stub()
          .withArgs(tokenKey, tokenValue)
          .returns(tokenValue)
      };

      const storageAPInstance = storageAPI(storage);
      const actualValue = storageAPInstance.set(tokenKey);

      expect(actualValue).toBe(tokenValue);
    });
  });
});
