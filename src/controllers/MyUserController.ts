import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const createcurrentuser = async (req: Request, res: Response) => {
  const { auth0Id } = req.body;
  try {
    // check if user exists
    const existinguser = await User.findOne({ auth0Id });
    if (existinguser) {
      return res.status(200).send();
    }
    // if not create a new

    const createUser = await User.create(req.body);

    await createUser.save();

    return res.status(201).json(createUser.toObject());
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error in creating a new User",
    });
  }
  //   next();
  // return created obj to client
};

export default {
  createcurrentuser,
};
