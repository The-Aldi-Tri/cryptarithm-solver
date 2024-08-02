const { evaluate } = require("mathjs");

class CryptarithmService {
  constructor() {}
  generatePermutations(n) {
    // Array of numbers 0 to 9
    const numbers = Array.from({ length: 10 }, (_, index) => index);

    // Helper function to generate permutations using Heap's algorithm
    function permute(current, start) {
      if (start === n) {
        return [current];
      }

      let permutations = [];

      for (let i = start; i < numbers.length; i++) {
        // Swap current element with element at index 'start'
        [numbers[start], numbers[i]] = [numbers[i], numbers[start]];
        permutations = permutations.concat(
          permute(current.concat(numbers[start]), start + 1)
        );
        // Undo the swap for backtracking
        [numbers[start], numbers[i]] = [numbers[i], numbers[start]];
      }

      return permutations;
    }

    // Start permutations generation with an empty initial permutation and start index 0
    return permute([], 0);
  }

  solve(equation) {
    // Initialize an array to store valid solutions
    const solutions = [];

    // Extract unique letters from the equation. Example: "ADA + DI = DIA" => A,D,I
    const uniqueLetters = Array.from(new Set(equation.match(/[A-Z]/g))).sort();

    const nUniqueLetters = uniqueLetters.length;

    // Check if there are more than 10 unique letters (not solvable)
    if (nUniqueLetters > 10) {
      return { error: "Not solvable because unique letters are more than 10" };
    }

    // Generate permutations of digits for unique letters. Example for 3-letter equation: ["012", "123", ...]
    const permutations = this.generatePermutations(nUniqueLetters);

    // Iterate over each permutation
    for (let perm of permutations) {
      // Initialize an empty map object to store mappings from letters to digits
      const map = {};

      // Map each unique letter to a digit from the current permutation.
      // Example: {'A': "0", 'D': "1", 'I': "2"}
      perm.forEach((element, index) => {
        map[uniqueLetters[index]] = element;
      });

      // Substitute the equation with current mappings
      const substitutedEquation = equation
        .split("")
        .map((char) => (map[char] !== undefined ? map[char] : char))
        .join("");

      // Split the substituted equation into left and right sides
      const [leftSide, rightSide] = substitutedEquation.split("=");

      // Evaluate and compare the left and right sides of the equation
      if (evaluate(leftSide) === evaluate(rightSide)) {
        solutions.push(map); // Store the valid solution map
      }
    }

    // Extract unique leading letters (first letter in word). Example: "ADA + DI = DIA" => A,D
    const uniqueLeadingLetters = Array.from(
      new Set(equation.split(/[-+=]/).map((word) => word[0]))
    );

    const noLeadingZeroSolutions = [];

    outerLoop: for (let solution of solutions) {
      for (let key in solution) {
        if (uniqueLeadingLetters.includes(key) && solution[key] === 0) {
          continue outerLoop;
        }
      }
      noLeadingZeroSolutions.push(solution);
    }

    // Return solutions
    return { solutions, noLeadingZeroSolutions };
  }
}

module.exports = CryptarithmService;
