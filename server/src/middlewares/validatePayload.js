const validatePayload = (schema) => {
  return async (req, res, next) => {
    const validationResult = schema.validate(req.body, {
      abortEarly: process.env.NODE_ENV === "production", // if true: Report all errors (not stop after first error)
      stripUnknown: true, // Strip unknown properties)
    });

    if (validationResult.error) {
      return res
        .status(422)
        .json({ error: validationResult.error.details[0].message });
    }

    next();
  };
};

module.exports = validatePayload;
