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

    if (inputText.search("[a-zA-Z]") != -1) {
      num = inputText.slice(0, inputText.search("[a-zA-Z]"));
    } else {
      num = inputText.slice(0);
    }

    if (validDecimal.test(result)) {
      result = Number(num);
    } else if (validFraction.test(result)) {
      const nominator = num.slice(0, num.indexOf("/"));
      const denominator = num.slice(num.indexOf("/") + 1);
      result = Number(nominator / denominator);
    } else {
      result = "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    if (inputText.search("[a-zA-Z]") != -1) {
      str = inputText.slice(inputText.search("[a-zA-Z]"));
      str.toLowerCase();
    }

    for (let i = 0; i < units.length; i++) {
      if (units[i] === str) {
        if (units[i] === "L" || units[i] === "l") {
          result = units[i].toUpperCase();
        }
        result = units[i].toLowerCase();
      } else {
        result = "invalid unit";
      }
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    if (initUnit == "gal" || initUnit == "GAL") {
      result = "L";
    } else if (initUnit == "l" || initUnit == "L") {
      result = "gal";
    } else if (initUnit == "mi" || initUnit == "MI") {
      result = "km";
    } else if (initUnit == "km" || initUnit == "KM") {
      result = "mi";
    } else if (initUnit == "lbs" || initUnit == "LBS") {
      result = "kg";
    } else if (initUnit == "kg" || initUnit == "KG") {
      result = "lbs";
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    if (unit == "gal" || unit == "GAL") {
      result = "gallons";
    } else if (unit == "l" || unit == "L") {
      result = "liters";
    } else if (unit == "mi" || unit == "MI") {
      result = "miles";
    } else if (unit == "km" || unit == "KM") {
      result = "kilometers";
    } else if (unit == "lbs" || unit == "LBS") {
      result = "pounds";
    } else if (unit == "kg" || unit == "KG") {
      result = "kilograms";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit == "gal" || initUnit == "GAL") {
      result = parseFloat((galToL * initNum).toFixed(5));
    } else if (initUnit == "l" || initUnit == "L") {
      result = parseFloat((initNum / galToL).toFixed(5));
    } else if (initUnit == "mi" || initUnit == "MI") {
      result = parseFloat((miToKm * initNum).toFixed(5));
    } else if (initUnit == "km" || initUnit == "KM") {
      result = parseFloat((initNum / miToKm).toFixed(5));
    } else if (initUnit == "lbs" || initUnit == "LBS") {
      result = parseFloat((lbsToKg * initNum).toFixed(5));
    } else if (initUnit == "kg" || initUnit == "KG") {
      result = parseFloat((initNum / lbsToKg).toFixed(5));
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
