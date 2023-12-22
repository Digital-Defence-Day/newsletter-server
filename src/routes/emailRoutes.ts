import { Router } from "express";
import { EmailSchema } from "../models";

export const emailRoutes = Router();

emailRoutes.post("/", async (req, res) => {
  try {
    const email = req.body?.email?.trim();
    if (email) {
      const isEmailValid = email.match(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      );
      if (!isEmailValid)
        return res.status(400).send({ message: "Provided email is invalid." });
      const doesEmailExist = !!(await EmailSchema.findOne({ email }));
      if (doesEmailExist)
        return res
          .status(400)
          .send({ message: "This email is already registered with us." });
      await EmailSchema.create({
        email,
        metaData: {
          ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        },
      });
      return res.status(201).send({ message: "Your email has been saved." });
    }
    return res.status(400).send({ message: "Please provide a valid email." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong." });
  }
});
