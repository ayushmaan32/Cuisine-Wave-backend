import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const createCurrentuser = async (req: Request, res: Response) => {
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

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.send(500).json({
      message: "Error in updating user",
    });
  }
};

export default {
  createCurrentuser,
  updateCurrentUser,
};
