import express from "express";

import { CreateUser, genpassword, GetuserByName } from "../CreateMovie.js";
import { auth } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/signup").post(auth, async (request, response) => {
  const { username, password } = request.body;
  const userfromDB = await GetuserByName(username);
  console.log(userfromDB);
  if (userfromDB) {
    response.send({ message: "username already exists" });
    return;
  }
  if (password.length < 8) {
    response.send({ message: "password must be longer" });
    return;
  }
  const hashedpassword = await genpassword(password);
  const result = await CreateUser({ username, password: hashedpassword });
  response.send(result);
});

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  const userfromDB = await GetuserByName(username);

  if (!userfromDB) {
    response.status(400).send({ message: "Invalid Credential" });
    return;
  }
  const storedpassword = userfromDB.password;
  console.log(storedpassword);

  const ispasswordmatch = await bcrypt.compare(password, storedpassword);
  console.log(ispasswordmatch);
  console.log(userfromDB);

  if (ispasswordmatch) {
    const token = jwt.sign({ id: userfromDB._id }, process.env.SECRET_KEY);
    response.send({ message: "successful login", token: token });
  } else {
    response.status(401).send({ message: "Invalid Credentials" });
  }
});

export const userRouter = router;
