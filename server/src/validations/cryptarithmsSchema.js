const Joi = require("joi");

let pattern = /^([A-Z]+(?: [+-] [A-Z]+)*)(?: = ([A-Z]+(?: [+-] [A-Z]+)*))?$/;
// Regular Expression Explanation:
//     /^: Asserts position at the start of the string.
//
//     ([A-Z]+(?: [+-] [A-Z]+)*): Captures the left-hand side of the equation:
//         [A-Z]+ matches one or more uppercase letters (first term).
//         (?: [+-] [A-Z]+)* matches zero or more occurrences of " [+ or -] [A-Z]+" (subsequent terms).
//
//     (?: = ([A-Z]+(?: [+-] [A-Z]+)*))?: Non-capturing group for the right-hand side of the equation (optional):
//         = matches the literal ' = '.
//         ([A-Z]+(?: [+-] [A-Z]+)*) captures one or more uppercase letters (first term of the right-hand side).
//         (?: [+-] [A-Z]+)* matches zero or more occurrences of " [+ or -] [A-Z]+" (subsequent terms).
//
//     $/: Asserts position at the end of the string.

const cryptarithmPayloadSchema = Joi.object({
  equation: Joi.string().pattern(pattern, "equation").required(),
});

module.exports = { cryptarithmPayloadSchema };
