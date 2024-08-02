const CryptarithmService = require("../../services/CryptarithmService");

let cryptarithmService;

beforeAll(() => {
  cryptarithmService = new CryptarithmService();
});

describe("Cryptarithm services - getPermutations", () => {
  it("should return permutations with the correct number", () => {
    function nPermutation(n, r) {
      if (n < r) return -1;

      let result = n;
      for (let i = 1; i < r; i++) result *= n - i;

      return result;
    }

    const nPermutationExpected = [];
    const nPermutationActual = [];

    for (let i = 1; i <= 10; i++) {
      nPermutationExpected.push(nPermutation(10, i));
      const perm = cryptarithmService.generatePermutations(i);
      nPermutationActual.push(perm.length);
    }
    expect(nPermutationActual).toEqual(nPermutationExpected);
  });

  it("should return permutations without duplicate", () => {
    for (let i = 1; i <= 10; i++) {
      const permutations = cryptarithmService.generatePermutations(i);
      const n = [];
      const uniqueN = [];
      for (let perm of permutations) {
        n.push(perm.length);
        const unique = new Set(perm);
        uniqueN.push(unique.size);
      }
      expect(uniqueN).toEqual(n);
    }
  });
});

describe("Cryptarithm services - solve", () => {
  it("should return not solvable when unique letters > 10", () => {
    const equationString = "HELLO+WORLD=WONDERFULLY";
    const expectedOutput = {
      error: "Not solvable because unique letters are more than 10",
    };
    const result = cryptarithmService.solve(equationString);
    expect(result).toEqual(expectedOutput);
  });

  it("should return correct solutions", () => {
    const equationString = "SEND+MORE=MONEY";
    const expectedOutput = {
      solutions: [
        { D: 1, E: 5, M: 0, N: 3, O: 8, R: 2, S: 7, Y: 6 },
        { D: 1, E: 7, M: 0, N: 3, O: 6, R: 4, S: 5, Y: 8 },
        { D: 1, E: 8, M: 0, N: 5, O: 7, R: 3, S: 6, Y: 9 },
        { D: 1, E: 8, M: 0, N: 2, O: 4, R: 6, S: 3, Y: 9 },
        { D: 2, E: 4, M: 0, N: 3, O: 9, R: 1, S: 8, Y: 6 },
        { D: 2, E: 5, M: 0, N: 4, O: 9, R: 1, S: 8, Y: 7 },
        { D: 2, E: 7, M: 0, N: 3, O: 6, R: 4, S: 5, Y: 9 },
        { D: 2, E: 7, M: 0, N: 1, O: 4, R: 6, S: 3, Y: 9 },
        { D: 3, E: 6, M: 0, N: 4, O: 8, R: 2, S: 7, Y: 9 },
        { D: 3, E: 8, M: 0, N: 5, O: 7, R: 2, S: 6, Y: 1 },
        { D: 4, E: 3, M: 0, N: 2, O: 9, R: 1, S: 8, Y: 7 },
        { D: 4, E: 5, M: 0, N: 3, O: 8, R: 2, S: 7, Y: 9 },
        { D: 4, E: 5, M: 0, N: 2, O: 7, R: 3, S: 6, Y: 9 },
        { D: 5, E: 4, M: 0, N: 1, O: 7, R: 3, S: 6, Y: 9 },
        { D: 6, E: 3, M: 0, N: 1, O: 8, R: 2, S: 7, Y: 9 },
        { D: 7, E: 5, M: 1, N: 6, O: 0, R: 8, S: 9, Y: 2 },
        { D: 7, E: 8, M: 0, N: 1, O: 3, R: 6, S: 2, Y: 5 },
        { D: 9, E: 4, M: 0, N: 1, O: 7, R: 2, S: 6, Y: 3 },
        { D: 9, E: 4, M: 0, N: 2, O: 8, R: 1, S: 7, Y: 3 },
        { D: 9, E: 5, M: 0, N: 3, O: 8, R: 1, S: 7, Y: 4 },
        { D: 9, E: 6, M: 0, N: 4, O: 8, R: 1, S: 7, Y: 5 },
        { D: 9, E: 7, M: 0, N: 1, O: 4, R: 5, S: 3, Y: 6 },
        { D: 9, E: 8, M: 0, N: 4, O: 6, R: 3, S: 5, Y: 7 },
        { D: 9, E: 8, M: 0, N: 1, O: 3, R: 6, S: 2, Y: 7 },
        { D: 9, E: 8, M: 0, N: 2, O: 4, R: 5, S: 3, Y: 7 },
      ],
      noLeadingZeroSolutions: [
        { D: 7, E: 5, M: 1, N: 6, O: 0, R: 8, S: 9, Y: 2 },
      ],
    };
    const result = cryptarithmService.solve(equationString);
    expect(result).toEqual(expectedOutput);
  });
});
