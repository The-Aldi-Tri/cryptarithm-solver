const { Router } = require("express");
const cryptarithmRouter = Router();

const validatePayload = require("../middlewares/validatePayload");
const { cryptarithmPayloadSchema } = require("../schemas/cryptarithmsSchema");
const cryptarithmsController = require("../controllers/cryptarithmsController");

/**
 * @openapi
 * '/cryptarithms':
 *  post:
 *     tags:
 *     - Cryptarithms Controller
 *     summary: Solve cryptarithm equation
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required: true
 *            properties:
 *              equation:
 *                type: string
 *                pattern: "^([A-Z]+(?: [+-] [A-Z]+)*)(?: = ([A-Z]+(?: [+-] [A-Z]+)*))?$"
 *              allowLeadingZero:
 *                type: boolean
 *           example:
 *             equation: "SEND + MORE = MONEY"
 *             allowLeadingZero: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                    solutions:
 *                      type: array
 *                      nullable: true
 *                      items: {
 *                        type: object
 *                      }
 *            examples:
 *              {
 *                "Solutions found": {
 *                  "description": "Equation successfully solved and solutions found",
 *                  "value": {
 *                    "data": {
 *                      "solutions": [
 *                        {
 *                          "D": "7",
 *                          "E": "5",
 *                          "M": "1",
 *                          "N": "6",
 *                          "O": "0",
 *                          "R": "8",
 *                          "S": "9",
 *                          "Y": "2"
 *                        }
 *                      ]
 *                    }
 *                  }
 *                },
 *                "Solutions not found": {
 *                  "description": "Equation successfully solved but solutions not found",
 *                  "value": {
 *                    "data": {
 *                      "solutions": []
 *                    }
 *                  }
 *                }
 *              }
 *      400:
 *        description: Not solvable equation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *            example:
 *              error: "Not solvable because unique letters are more than 10"
 *      422:
 *        description: Validation Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *            example:
 *              error: "allowLeadingZero is required"
 *      500:
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *            example:
 *              error: "Internal Server Error"
 */
cryptarithmRouter.post(
  "/cryptarithms",
  validatePayload(cryptarithmPayloadSchema),
  cryptarithmsController.solve
);

module.exports = cryptarithmRouter;
