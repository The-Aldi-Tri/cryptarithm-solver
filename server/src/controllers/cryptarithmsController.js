const asyncWrapper = require("../utils/asyncWrapper");
const CryptarithmService = require("../services/CryptarithmService");
const CacheService = require("../services/redis/CacheService");

const cacheService = new CacheService();

const solve = asyncWrapper(async (req, res) => {
  const equation = req.body.equation.replace(/\s+/g, "");
  const allowLeadingZero = req.body.allowLeadingZero;

  let isCached = true;
  let result;

  result = JSON.parse(
    await cacheService.get(`solutions:${equation}-${allowLeadingZero}`)
  );

  if (result === null) {
    result = await CryptarithmService.solve(equation, allowLeadingZero);
    await cacheService.set(
      `solutions:${equation}-${allowLeadingZero}`,
      JSON.stringify(result)
    );
    isCached = false;
  }

  if (isCached) {
    res.set("X-Data-Source", "cache");
  }

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  // // If no solutions were found, return a response indicating so
  // if (result.solutions.length === 0) {
  //   return res.status(200).json({ result: "No solution found" });
  // }

  // Return a response with solutions
  return res.status(200).json({
    data: {
      solutions: result.solutions,
    },
  });
});

module.exports = { solve };
