const units = [
  "L",
  "l",
  "gal",
  "GAL",
  "mi",
  "MI",
  "km",
  "KM",
  "lbs",
  "LBS",
  "kg",
  "KG",
];
function ConvertHandler() {
  this.getNum = function (input) {
    let validFraction = /^([1-9]\d*(\.\d+)?)[/](\d+(\.\d+)?)$/; //fraction
    let validDecimal = /^\d+(\.\d+)?$/; //decimal
    let result;

    if (input.search("[a-zA-Z]") != -1) {
      num = input.slice(0, input.search("[a-zA-Z]")).trim();
    } else {
      num = input.slice(0).trim();
    }

    if (validDecimal.test(num)) {
      result = Number(num);
    } else if (validFraction.test(num)) {
      const nominator = num.slice(0, num.indexOf("/"));
      const denominator = num.slice(num.indexOf("/") + 1);
      result = Number(nominator / denominator);
    } else if (num === "") {
      result = 1;
    } else {
      result = "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    if (input.search("[a-zA-Z]") != -1) {
      str = input.slice(input.search("[a-zA-Z]"));
      str.toLowerCase();
    }

    for (let i = 0; i < units.length; i++) {
      if (units.includes(str)) {
        if (str === "L" || str === "l") {
          result = str.toUpperCase();
        } else {
          result = str.toLowerCase();
        }
      } else {
        result = "invalid unit";
      }
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    let unit = this.getUnit(initUnit);
    if (unit == "gal" || unit == "GAL") {
      result = "L";
    } else if (unit == "l" || unit == "L") {
      result = "gal";
    } else if (unit == "mi" || unit == "MI") {
      result = "km";
    } else if (unit == "km" || unit == "KM") {
      result = "mi";
    } else if (unit == "lbs" || unit == "LBS") {
      result = "kg";
    } else if (unit == "kg" || unit == "KG") {
      result = "lbs";
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    let unitR = this.getUnit(unit);
    if (unitR !== "invalid unit") {
      switch (unitR) {
        case "L":
          result = "liters";
          break;
        case "gal":
          result = "gallons";
          break;
        case "mi":
          result = "miles";
          break;
        case "km":
          result = "kilometers";
          break;
        case "lbs":
          result = "pounds";
          break;
        case "kg":
          result = "kilograms";
          break;
      }
    }
    return result === undefined ? "invalid unit" : result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let unit = this.getUnit(initUnit);
    let num = initNum;
    let result;

    if (num !== "invalid number" && unit !== "invalid unit") {
      switch (unit) {
        case "gal":
          result = num * galToL;
          break;
        case "L":
          result = num / galToL;
          break;
        case "lbs":
          result = num * lbsToKg;
          break;
        case "kg":
          result = num / lbsToKg;
          break;
        case "mi":
          result = num * miToKm;
          break;
        case "km":
          result = num / miToKm;
          break;
      }
    }
    return result ? result : "Conversion error";
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    numRound = parseFloat(returnNum.toFixed(5));
    string = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${numRound} ${this.spellOutUnit(returnUnit)}`;
    return {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: numRound,
      returnUnit: returnUnit,
      string: string,
    };
  };
}

module.exports = ConvertHandler;
