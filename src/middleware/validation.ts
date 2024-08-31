import { NextFunction, Response, Request } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isEmpty().isString().withMessage("Name must be string"),
  body("addressLine1")
    .isEmpty()
    .isString()
    .withMessage("addressLine1 must be string"),
  body("city").isEmpty().isString().withMessage("City must be string"),
  body("country").isEmpty().isString().withMessage("Name must be string"),
  handleValidationErrors,
];
