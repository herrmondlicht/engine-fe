import { stub } from "sinon";
import { storageAPI } from "./storageAPI";

describe("Storage API test", () => {
  describe("get method", () => {
    it("return of method get when correct type is passed", () => {
      const tokenValue = "123vjh122biuv1273";
      const tokenKey = "token";
      const storage = {
        getItem: stub().withArgs(tokenKey).returns(tokenValue),
      };

      const storageAPInstance = storageAPI(storage);
      const actualValue = storageAPInstance.getItem(tokenKey);

      expect(actualValue).toBe(tokenValue);
    });
  });

  describe("set method", () => {
    it("return of method set when correct type is passed", () => {
      const tokenValue = "123vjh122biuv1273";
      const tokenKey = "token";
      const storage = {
        setItem: stub(),
      };
      storage.setItem.withArgs(tokenKey, tokenValue).returns(tokenValue);

      const storageAPInstance = storageAPI(storage);
      const actualValue = storageAPInstance.setItem(tokenKey, tokenValue);
      expect(actualValue).toBe(tokenValue);
    });
  });

  describe("remove method", () => {
    it("return of method remove when correct type is passed", () => {
      const tokenKey = "token";
      const storage = {
        removeItem: stub(),
      };
      storage.removeItem.withArgs(tokenKey).returns(undefined);

      const storageAPInstance = storageAPI(storage);
      const actualValue = storageAPInstance.removeItem(tokenKey);

      expect(actualValue).toBe(undefined);
    });
  });
});
