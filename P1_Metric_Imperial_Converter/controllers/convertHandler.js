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
    if (unitR == "gal" || unitR == "GAL") {
      result = "gallons";
    } else if (unitR == "l" || unitR == "L") {
      result = "liters";
    } else if (unitR == "mi" || unitR == "MI") {
      result = "miles";
    } else if (unitR == "km" || unitR == "KM") {
      result = "kilometers";
    } else if (unitR == "lbs" || unitR == "LBS") {
      result = "pounds";
    } else if (unitR == "kg" || unitR == "KG") {
      result = "kilograms";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let unit = this.getUnit(initUnit);
    let num = this.getNum(initNum);
    let result;

    if (unit == "gal" || unit == "GAL") {
      result = parseFloat(galToL * num);
      console.log(result);
    } else if (unit == "l" || unit == "L") {
      result = parseFloat(num / galToL);
    } else if (unit == "mi" || unit == "MI") {
      result = parseFloat(miToKm * num);
    } else if (unit == "km" || unit == "KM") {
      result = parseFloat(num / miToKm);
    } else if (unit == "lbs" || unit == "LBS") {
      result = parseFloat(lbsToKg * num);
    } else if (unit == "kg" || unit == "KG") {
      result = parseFloat(num / lbsToKg);
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
