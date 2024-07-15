const { Router } = require("express");
const cryptarithmRouter = Router();

const validatePayload = require("../middlewares/validatePayload");
const {
  cryptarithmPayloadSchema,
} = require("../validations/cryptarithmsSchema");
const cryptarithmsController = require("../controllers/cryptarithmsController");

cryptarithmRouter.post(
  "/cryptarithms",
  validatePayload(cryptarithmPayloadSchema),
  cryptarithmsController.solve
);

module.exports = cryptarithmRouter;
