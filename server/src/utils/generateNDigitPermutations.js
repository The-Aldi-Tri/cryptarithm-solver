function generateNDigitPermutations(n) {
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

module.exports = generateNDigitPermutations;
