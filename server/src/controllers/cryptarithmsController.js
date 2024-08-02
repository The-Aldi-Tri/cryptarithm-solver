const asyncWrapper = require("../utils/asyncWrapper");
const {
  cacheService,
  cryptarithmService,
} = require("../services/instanceOfServices");

const solve = asyncWrapper(async (req, res) => {
  const equation = req.body.equation.replace(/\s+/g, "");

  let isCached = true;
  let result;

  result = JSON.parse(await cacheService.get(`solve:${equation}`));

  if (result === null) {
    result = cryptarithmService.solve(equation);
    await cacheService.set(`solve:${equation}`, JSON.stringify(result));
    isCached = false;
  }

  if (isCached) {
    res.set("X-Data-Source", "cache");
  }

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  // Return a response with solutions
  return res.status(200).json({
    data: {
      ...result,
    },
  });
});

module.exports = { solve };
