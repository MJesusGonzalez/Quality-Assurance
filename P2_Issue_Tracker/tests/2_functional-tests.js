const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const Issue = require("../models/issue");
const { ObjectId } = require("mongodb");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Test POST", () => {
    // #1
    // #2
    // #3
  });

  suite("Test GET", () => {
    // #1
    // #2
    // #3
  });

  suite("Test PUT", () => {
    // #1
    // #2
    // #3
    // #4
    // #5
  });

  suite("Test DELETE", () => {
    // #1
    // #2
    // #3
  });
});
