const mathjs = require("mathjs");

class CryptarihtmService {
  constructor() {}
  static async generatePermutations(n) {
    const numbers = Array.from({ length: 10 }, (_, index) => index); // Array of numbers 0 to 9

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

  static async getUniqueLetters(equation) {
    return Array.from(new Set(equation.match(/[A-Z]/g))).sort();
  }

  static async getUniqueLeadingLetters(equation) {
    const expressions = equation.split(/[-+=]/);

    let uniqueLeadingLetters = new Set();
    for (let i in expressions) {
      uniqueLeadingLetters.add(expressions[i][0]);
    }

    return Array.from(uniqueLeadingLetters);
  }

  static async solve(equation, allowLeadingZero = true) {
    // Initialize an array to store valid solutions
    const solutions = [];

    // Extract unique letters from the equation. Example: "ADA + DI = DIA" => A,D,I
    const uniqueLetters = await this.getUniqueLetters(equation);

    const n = uniqueLetters.length;

    // Check if there are more than 10 unique letters (not solvable)
    if (n > 10) {
      return { error: "Not solvable because unique letters are more than 10" };
    }

    // Extract unique leading letters (first letter in word). Example: "ADA + DI = DIA" => A,D
    let uniqueLeadingLetters;
    if (!allowLeadingZero) {
      uniqueLeadingLetters = await this.getUniqueLeadingLetters(equation);
    }

    // Generate permutations of digits for unique letters. Example for 3-letter equation: ["012", "123", ...]
    const permutations = (await this.generatePermutations(n)).map((perm) =>
      perm.join("")
    );

    // Iterate over each permutation
    permutationsLoop: for (let perm of permutations) {
      // Initialize an empty map object to store mappings from letters to digits
      const map = {};

      // Map each unique letter to a digit from the current permutation.
      // Example: {'A': "0", 'D': "1", 'I': "2"}
      for (let i in perm.split("")) {
        //Check if leading letter map to zero
        if (perm[i] == 0 && !allowLeadingZero) {
          if (uniqueLeadingLetters.includes(uniqueLetters[i])) {
            continue permutationsLoop; //Skip iteration if so
          }
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
    }

    // Return solutions
    return { solutions };
  }
}

module.exports = CryptarihtmService;
