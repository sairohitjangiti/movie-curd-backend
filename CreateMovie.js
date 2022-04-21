import { ObjectId } from "mongodb";
import { client } from "./index.js";
import bcrypt from "bcrypt";

async function CreateMovie(data) {
  return await client.db("demo").collection("movies").insertMany(data);
}
async function Post1movie(data) {
  return await client.db("demo").collection("movies").insertOne(data);
}

async function CreateUser(data) {
  return await client.db("demo").collection("users").insertOne(data);
}

async function GetuserByName(username) {
  return await client
    .db("demo")
    .collection("users")
    .findOne({ username: username });
}

async function FilteringMovies(filter) {
  return await client.db("demo").collection("movies").find(filter).toArray();
}
async function FindMovie(id) {
  console.log(id);
  return await client
    .db("demo")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}
async function DeleteMovie(id) {
  return await client
    .db("demo")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
async function UpdateMovie(id, data) {
  return await client
    .db("demo")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}

async function genpassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedpassword = await bcrypt.hash(password, salt);
  console.log(hashedpassword);
  return hashedpassword;
}

export {
  FilteringMovies,
  CreateMovie,
  FindMovie,
  DeleteMovie,
  UpdateMovie,
  CreateUser,
  genpassword,
  Post1movie,
  GetuserByName,
};
