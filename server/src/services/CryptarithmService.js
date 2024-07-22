const mathjs = require("mathjs");

class CryptarihtmService {
  generateNDigitPermutations(n) {
    let permutations = [];

    function generatePermutations(currentPermutation, usedDigits) {
      if (currentPermutation.length === n) {
        permutations.push(currentPermutation.join(""));
        return;
      }

      for (let digit = 0; digit <= 9; digit++) {
        // Check if digit is not used yet
        if (!usedDigits[digit]) {
          usedDigits[digit] = true; // Mark digit as used
          currentPermutation.push(digit);
          generatePermutations(currentPermutation, usedDigits);
          currentPermutation.pop();
          usedDigits[digit] = false; // Un-mark digit for backtracking
        }
      }
    }

    generatePermutations([], {});

    // Pad permutations with leading zeros to ensure same length
    permutations = permutations.map((num) => num.padStart(n, "0"));

    return permutations;
  }

  getUniqueLetters(equation) {
    return Array.from(new Set(equation.match(/[A-Z]/g))).sort();
  }

  getUniqueLeadingLetters(equation) {
    const expressions = equation.split(/[-+=]/);

    let uniqueLeadingLetters = new Set();
    for (let i in expressions) {
      uniqueLeadingLetters.add(expressions[i].trim()[0]);
    }

    return Array.from(uniqueLeadingLetters);
  }

  solve(equation, allowLeadingZero = true) {
    // Initialize an array to store valid solutions
    const solutions = [];

    // Extract unique letters from the equation. Example: "ADA + DI = DIA" => A,D,I
    const uniqueLetters = this.getUniqueLetters(equation);

    // Check if there are more than 10 unique letters (not solvable)
    if (uniqueLetters.length > 10) {
      return { error: "Not solvable because unique letters are more than 10" };
    }

    // Extract unique leading letters (first letter in word). Example: "ADA + DI = DIA" => A,D
    let uniqueLeadingLetters;
    if (!allowLeadingZero) {
      uniqueLeadingLetters = this.getUniqueLeadingLetters(equation);
    }

    // Generate permutations of digits for unique letters. Example for 3-letter equation: ["012", "123", ...]
    const permutations = this.generateNDigitPermutations(uniqueLetters.length);

    // Iterate over each permutation
    for (let perm of permutations) {
      // Initialize an empty map object to store mappings from letters to digits
      const map = {};

      // Map each unique letter to a digit from the current permutation.
      // Example: {'A': "0", 'D': "1", 'I': "2"}
      for (let i in perm) {
        //Check if leading letter map to zero
        if (perm[i] == 0 && !allowLeadingZero) {
          if (uniqueLeadingLetters.includes(uniqueLetters[i])) {
            continue; //Skip iteration if so
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
