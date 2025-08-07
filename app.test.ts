import app from "./app";
import { request, use, expect } from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import { Response } from "superagent";

use(chaiHttp);

describe("The app", () => {
  describe("GET /", () => {
    let response: Response;

    before(async () => {
      response = await request(app).get("/");
    });

    it("should show webpage with headline and the data table", async () => {
      expect(response).to.have.status(200);
      expect(response.text).to.contain(
        "Number of Datasets Published by Federal Ministries"
      );
      expect(response.text).to.contain(
        '<table class="w-full table-auto border-collapse">'
      );
    });
  });
});
