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
  body("name").isString().withMessage("Name must be string"),
  body("addressLine1")
    .isString()

    .withMessage("addressLine1 must be string"),
  body("city").isString().withMessage("City must be string"),
  body("country").isString().withMessage("Name must be string"),
  handleValidationErrors,
];
