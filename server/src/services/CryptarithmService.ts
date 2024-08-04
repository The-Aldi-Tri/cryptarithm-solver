import { evaluate } from 'mathjs';

type SolutionMap = { [key: string]: number };

interface SolveResultSuccess {
  solutions: SolutionMap[];
  noLeadingZeroSolutions: SolutionMap[];
}

interface SolveResultError {
  error: string;
}

type SolveResult = SolveResultSuccess | SolveResultError;

class CryptarithmService {
  generatePermutations(n: number): number[][] {
    const numbers = Array.from({ length: 10 }, (_, index) => index);

    // Helper function to generate permutations using Heap's algorithm
    function permute(current: number[], start: number): number[][] {
      if (start === n) {
        return [current];
      }

      let permutations: number[][] = [];

      for (let i = start; i < numbers.length; i++) {
        // Swap current element with element at index 'start'
        [numbers[start], numbers[i]] = [numbers[i], numbers[start]];
        permutations = permutations.concat(
          permute(current.concat(numbers[start]), start + 1),
        );
        // Undo the swap for backtracking
        [numbers[start], numbers[i]] = [numbers[i], numbers[start]];
      }

      return permutations;
    }

    // Start permutations generation with an empty initial permutation and start index 0
    return permute([], 0);
  }

  solve(equation: string): SolveResult {
    const solutions: SolutionMap[] = [];

    // Extract unique letters from the equation
    const uniqueLetters = Array.from(
      new Set(equation.match(/[A-Z]/g) || []),
    ).sort();
    const nUniqueLetters = uniqueLetters.length;

    // Check if there are more than 10 unique letters (not solvable)
    if (nUniqueLetters > 10) {
      return { error: 'Not solvable because unique letters are more than 10' };
    }

    // Generate permutations of digits for unique letters
    const permutations = this.generatePermutations(nUniqueLetters);

    // Iterate over each permutation
    for (const perm of permutations) {
      const map: SolutionMap = {};

      // Map each unique letter to a digit from the current permutation
      perm.forEach((element, index) => {
        map[uniqueLetters[index]] = element;
      });

      // Substitute the equation with current mappings
      const substitutedEquation = equation
        .split('')
        .map((char) => (typeof map[char] === 'number' ? map[char] : char))
        .join('');

      // Split the substituted equation into left and right sides
      const [leftSide, rightSide] = substitutedEquation.split('=');

      // Evaluate and compare the left and right sides of the equation
      if (evaluate(leftSide) === evaluate(rightSide)) {
        solutions.push(map); // Store the valid solution map
      }
    }

    // Extract unique leading letters (first letter in word)
    const uniqueLeadingLetters = Array.from(
      new Set(equation.split(/[-+=]/).map((word) => word[0])),
    );

    const noLeadingZeroSolutions: SolutionMap[] = [];

    outerLoop: for (const solution of solutions) {
      for (const key in solution) {
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

export default CryptarithmService;
