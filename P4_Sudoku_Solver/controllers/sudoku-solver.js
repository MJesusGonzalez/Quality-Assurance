class SudokuSolver {
  validate(puzzleString) {
    const regex = /^[1-9.]+$/;

    if (!puzzleString) return false;

    if (!regex.test(puzzleString) || puzzleString.length !== 81) return false;

    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}

  letterToNumber(row) {
    return row.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 1;
  }
}

module.exports = SudokuSolver;
