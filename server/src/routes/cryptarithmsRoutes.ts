import validatePayload from '../middlewares/validatePayload';
import { cryptarithmPayloadSchema } from '../schemas/cryptarithmsSchema';
import cryptarithmsController from '../controllers/cryptarithmsController';
import { Router } from 'express';
const cryptarithmRouter = Router();

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
 *                pattern: "^([A-Z]+(?:\\s*[+-]\\s*[A-Z]+)*)(?:\\s*=\\s*([A-Z]+(?:\\s*[+-]\\s*[A-Z]+)*))?$"
 *           example:
 *             equation: "SEND + MORE = MONEY"
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
 *                    noLeadingZeroSolutions:
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
 *                                    { D: 1, E: 5, M: 0, N: 3, O: 8, R: 2, S: 7, Y: 6 },
 *                                    { D: 1, E: 7, M: 0, N: 3, O: 6, R: 4, S: 5, Y: 8 },
 *                                    { D: 1, E: 8, M: 0, N: 5, O: 7, R: 3, S: 6, Y: 9 },
 *                                    { D: 1, E: 8, M: 0, N: 2, O: 4, R: 6, S: 3, Y: 9 },
 *                                    { D: 2, E: 4, M: 0, N: 3, O: 9, R: 1, S: 8, Y: 6 },
 *                                    { D: 2, E: 5, M: 0, N: 4, O: 9, R: 1, S: 8, Y: 7 },
 *                                    { D: 2, E: 7, M: 0, N: 3, O: 6, R: 4, S: 5, Y: 9 },
 *                                    { D: 2, E: 7, M: 0, N: 1, O: 4, R: 6, S: 3, Y: 9 },
 *                                    { D: 3, E: 6, M: 0, N: 4, O: 8, R: 2, S: 7, Y: 9 },
 *                                    { D: 3, E: 8, M: 0, N: 5, O: 7, R: 2, S: 6, Y: 1 },
 *                                    { D: 4, E: 3, M: 0, N: 2, O: 9, R: 1, S: 8, Y: 7 },
 *                                    { D: 4, E: 5, M: 0, N: 3, O: 8, R: 2, S: 7, Y: 9 },
 *                                    { D: 4, E: 5, M: 0, N: 2, O: 7, R: 3, S: 6, Y: 9 },
 *                                    { D: 5, E: 4, M: 0, N: 1, O: 7, R: 3, S: 6, Y: 9 },
 *                                    { D: 6, E: 3, M: 0, N: 1, O: 8, R: 2, S: 7, Y: 9 },
 *                                    { D: 7, E: 5, M: 1, N: 6, O: 0, R: 8, S: 9, Y: 2 },
 *                                    { D: 7, E: 8, M: 0, N: 1, O: 3, R: 6, S: 2, Y: 5 },
 *                                    { D: 9, E: 4, M: 0, N: 1, O: 7, R: 2, S: 6, Y: 3 },
 *                                    { D: 9, E: 4, M: 0, N: 2, O: 8, R: 1, S: 7, Y: 3 },
 *                                    { D: 9, E: 5, M: 0, N: 3, O: 8, R: 1, S: 7, Y: 4 },
 *                                    { D: 9, E: 6, M: 0, N: 4, O: 8, R: 1, S: 7, Y: 5 },
 *                                    { D: 9, E: 7, M: 0, N: 1, O: 4, R: 5, S: 3, Y: 6 },
 *                                    { D: 9, E: 8, M: 0, N: 4, O: 6, R: 3, S: 5, Y: 7 },
 *                                    { D: 9, E: 8, M: 0, N: 1, O: 3, R: 6, S: 2, Y: 7 },
 *                                    { D: 9, E: 8, M: 0, N: 2, O: 4, R: 5, S: 3, Y: 7 },
 *                      ],
 *                      "noLeadingZeroSolutions": [
 *                                                  { D: 7, E: 5, M: 1, N: 6, O: 0, R: 8, S: 9, Y: 2 },
 *                      ]
 *                    }
 *                  }
 *                },
 *                "Solutions not found": {
 *                  "description": "Equation successfully solved but solutions not found",
 *                  "value": {
 *                    "data": {
 *                      "solutions": [],
 *                      "noLeadingZeroSolutions": []
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
 *              error: "equation is required"
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
  '/cryptarithms',
  validatePayload(cryptarithmPayloadSchema),
  cryptarithmsController.solve,
);

export default cryptarithmRouter;
