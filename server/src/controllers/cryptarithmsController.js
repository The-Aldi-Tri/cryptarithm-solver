const mathjs = require("mathjs");
const generateNDigitPermutations = require("../utils/generateNDigitPermutations");

const solve = async (req, res, next) => {
  const { equation } = req.body;

  try {
    // Initialize an empty array to store valid solution later
    const solutions = [];

    // Extract unique letters from the equation
    const uniqueLetters = Array.from(new Set(equation.match(/[A-Z]/g))).sort();

    // Check if there are more than 10 unique letters (not solvable)
    if (uniqueLetters.length > 10) {
      return res
        .status(400)
        .json({ message: "Not solvable: Unique letters is more than 10" });
    }

    // Generate permutations of digits for unique letters. Example for 3-letter equation: ["012", "123", ...]
    const permutations = generateNDigitPermutations(uniqueLetters.length);

    // Iterate over each permutation
    permutations.forEach((perm) => {
      // Initialize an empty map object to store mappings from letters to digits
      const map = {};
      // Map each unique letter to a digit from the current permutation.
      // Example: {'A': "0", 'B': "1", 'C': "2"}
      for (let i in perm) {
        map[uniqueLetters[i]] = perm[i];
      }

      // Substitute the equation with current mappings
      const substitutedEquation = equation
        .split("")
        .map((char) => map[char] || char)
        .join("");

      // Split the substituted equation into left and right sides
      const [leftSide, rightSide] = substitutedEquation.split("=");

      // Evaluate and compare the left and right sides of the equation
      if (mathjs.evaluate(leftSide) === mathjs.evaluate(rightSide)) {
        solutions.push(map); // Store the valid solution map
      }
    });

    // If no solutions were found, return a response indicating so
    if (solutions.length === 0) {
      return res.status(200).json({ result: "No solution found" });
    }

    // Return a response with the number of solutions found and the solutions themselves
    return res.status(200).json({
      data: {
        n_solutions: solutions.length,
        solutions,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const solveNoLeadingZero = async (req, res, next) => {
  const { equation } = req.body;

  try {
    // Initialize an empty array to store valid solution later
    const solutions = [];

    // Extract unique leading letters. Example: "ADA + DI = DIA" => leading letters: A,D
    const expressions = equation.split(/=|\+|-/);
    let leadingLetter = new Set();
    for (let i in expressions) {
      leadingLetter.add(expressions[i].trim()[0]);
    }
    leadingLetter = Array.from(leadingLetter);

    // Extract unique letters from the equation
    const uniqueLetters = Array.from(new Set(equation.match(/[A-Z]/g))).sort();

    // Check if there are more than 10 unique letters (not solvable)
    if (uniqueLetters.length > 10) {
      return res
        .status(400)
        .json({ message: "Not solvable: Unique letters is more than 10" });
    }

    // Generate permutations of digits for unique letters. Example for 3-letter equation: ["012", "123", ...]
    const permutations = generateNDigitPermutations(uniqueLetters.length);

    // Iterate over each permutation
    permutations.forEach((perm) => {
      // Initialize an empty map object to store mappings from letters to digits
      const map = {};

      // Map each unique letter to a digit from the current permutation.
      // Example: {'A': "0", 'B': "1", 'C': "2"}
      for (let i in perm) {
        //Check if leading letter map to zero
        if (leadingLetter.includes(uniqueLetters[i]) && perm[i] == 0) {
          return; // Skip iteration if so
        }
        map[uniqueLetters[i]] = perm[i];
      }

      // Substitute the equation with current mappings
      const substitutedEquation = equation
        .split("")
        .map((char) => map[char] || char)
        .join("");

      // Split the substituted equation into left and right sides
      const [leftSide, rightSide] = substitutedEquation.split("=");

      // Evaluate and compare the left and right sides of the equation
      if (mathjs.evaluate(leftSide) === mathjs.evaluate(rightSide)) {
        solutions.push(map); // Store the valid solution map
      }
    });

    // If no solutions were found, return a response indicating so
    if (solutions.length === 0) {
      return res.status(200).json({ result: "No solution found" });
    }

    // Return a response with the number of solutions found and the solutions themselves
    return res.status(200).json({
      data: {
        n_solutions: solutions.length,
        solutions,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { solve, solveNoLeadingZero };
