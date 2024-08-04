import Joi from 'joi';

const pattern =
  /^([A-Z]+(?:\s*[+-]\s*[A-Z]+)*)(?:\s*=\s*([A-Z]+(?:\s*[+-]\s*[A-Z]+)*))?$/;
/**
  Regex Breakdown
    1. ^: Asserts the position at the start of the string. This ensures that the pattern must start matching from the beginning of the string.
    2. ([A-Z]+(?:\s*[+-]\s*[A-Z]+)*):
        [A-Z]+: Matches one or more uppercase letters. This is the initial part of the pattern.
        (?: ... ): A non-capturing group. It groups the enclosed pattern but does not capture it for back-references.
        \s*: Matches zero or more whitespace characters (spaces, tabs, etc.) around the + or - signs.
        [+-]: Matches either a + or - sign.
        \s*: Matches zero or more whitespace characters following the sign.
        [A-Z]+: Matches one or more uppercase letters after the sign.
        *: Indicates that the non-capturing group (the part with the sign and letters) can repeat zero or more times.
        Overall, this part of the regex matches sequences of uppercase letters that may be separated by + or - signs, with optional whitespace around the signs.
    3. (?:\s*=\s*([A-Z]+(?:\s*[+-]\s*[A-Z]+)*))?:
        (?: ... ): A non-capturing group for the entire optional pattern after the =.
        \s*=\s*: Matches an equal sign =, with optional whitespace before and after it.
        ([A-Z]+(?:\s*[+-]\s*[A-Z]+)*): This is a capturing group that matches the same pattern as the first part (a sequence of uppercase letters with optional + or - signs and spaces).
        ?: Indicates that the entire non-capturing group (the = ... part) is optional, meaning the pattern will match whether or not this part is present.
    4. $: Asserts the position at the end of the string. This ensures that the pattern must end at the end of the string.
  
  Examples
    1. A+B:
        Matches the first capturing group: A+B.
        The second part (after =) is absent.
    2. A + B = C - D:
        Matches the first capturing group: A + B.
        Matches the second capturing group: C - D.
    3. X - Y + Z = A:
        Matches the first capturing group: X - Y + Z.
        Matches the second capturing group: A.
    4. A = B + C:
        Matches the first capturing group: A.
        Matches the second capturing group: B + C.
    5. A + B - C = D + E:
        Matches the first capturing group: A + B - C.
        Matches the second capturing group: D + E.
 */

const cryptarithmPayloadSchema = Joi.object({
  equation: Joi.string().pattern(pattern, 'equation').required(),
});

export { cryptarithmPayloadSchema };
