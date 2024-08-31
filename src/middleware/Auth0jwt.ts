import { Response, Request, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGN_IN_ALG,
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token);
    const auth0Id = decoded?.sub;
    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.sendStatus(404);
    }
    const userId = user._id;

    req.auth0Id = auth0Id as string;
    req.userId = userId.toString();

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
