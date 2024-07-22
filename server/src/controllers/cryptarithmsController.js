const CryptarithmService = require("../services/CryptarithmService");

const solve = async (req, res, next) => {
  const { equation } = req.body;

  const cryptarithmService = new CryptarithmService();
  try {
    const { solutions, error } = cryptarithmService.solve(equation);

    if (error) {
      return res.status(400).json({ error });
    }

    // If no solutions were found, return a response indicating so
    if (solutions.length === 0) {
      return res.status(200).json({ result: "No solution found" });
    }

    // Return a response with solutions
    return res.status(200).json({
      data: {
        solutions,
      },
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

module.exports = { solve };
