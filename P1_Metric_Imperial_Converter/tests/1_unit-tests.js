const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function getNum(input)", function () {
    test("Whole number input", function () {
      var input = "12 L";
      assert.equal(convertHandler.getNum(input), 12);
    });

    test("Decimal Input", function () {
      var input = "12.2L";
      assert.approximately(convertHandler.getNum(input), 12.2, 0.1);
    });

    test("Fractional Input", function () {
      var input = "12/2L";
      assert.equal(convertHandler.getNum(input), 6);
    });

    test("Fractional Input with Decimal", function () {
      var input = "12.2/2L";
      assert.approximately(convertHandler.getNum(input), 6.1, 0.1);
    });

    test("Invalid Input (double fraction)", function () {
      var input = "12/2/1L";
      assert.equal(convertHandler.getNum(input), "invalid number");
    });

    test("No Numerical Input", function () {
      var input = "L";
      assert.equal(convertHandler.getNum(input), "invalid number");
    });
  });
});
