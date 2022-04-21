// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

import { moviesRouter } from "./routes/Movies.js";
import { userRouter } from "./routes/users.js";
const app = express();
dotenv.config();

// console.log(process.env);
const PORT = process.env.PORT;

// const MONGO_URL = "mongodb://localhost";  // this is for localhost

// to connect online the mongo db
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json()); //to use json anywhere in program

app.use(cors()); //every request in the page is allowed by cors/access by any origin

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //returns promise
  console.log("Mongodb is connected");
  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("Hello ☁☁☁☁☁");
});

// app.get("/movies", (request, response) => {
//   response.send(movies);
// });

app.use("/movies", moviesRouter);
app.use("/users", userRouter);

// const recipes = [
//   {
//     name: "Mutton Sukka",
//     pic: "https://c.ndtvimg.com/2021-09/p3se4be8_mutton-sukka_625x300_01_September_21.jpg",
//   },
//   {
//     name: "Paneer Butter Masala",
//     pic: "https://www.indianveggiedelight.com/wp-content/uploads/2017/09/instant-pot-paneer-butter-masala-featured.jpg",
//   },
//   {
//     name: "Ratatouile Dish",
//     pic: "https://media.chefdehome.com/740/0/0/ratatouille/ratatouille-casserole.jpg",
//   },
//   {
//     name: "Channa Masala",
//     pic: "https://www.seriouseats.com/thmb/t9WrKWmayGJmdIGMQeiYG-3k_Mw=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__03__20160328-channa-masala-recipe-6-ae4913c04d5b43e9acef2917a74aa5fc.jpg",
//   },
//   {
//     name: "Paneer Tikka",
//     pic: "https://www.indianveggiedelight.com/wp-content/uploads/2021/08/air-fryer-paneer-tikka-featured.jpg",
//   },
//   {
//     name: "Naan",
//     pic: "https://www.vegrecipesofindia.com/wp-content/uploads/2013/07/naan-recipe-2-500x500.jpg",
//   },
//   {
//     name: "Tandoori Chicken",
//     pic: "https://sharkninja-cookingcircle.s3.eu-west-1.amazonaws.com/wp-content/uploads/2020/07/31170104/Tandori-chicken-1-rotated-1.jpg",
//   },
//   {
//     name: "Chicken Briyani",
//     pic: "https://foodfinger.in/wp-content/uploads/2021/04/Tandoori-Chicken-Biryani-scaled.jpg",
//   },
// ];
// Recipes list
app.get("/recipes", async (request, response) => {
  const result = await client
    .db("demo")
    .collection("recipes")
    .find({})
    .toArray();
  response.send(result);
});
app.post("/recipes", async (request, response) => {
  const data = request.body;
  console.log(data);
  const result = await client.db("demo").collection("recipes").insertMany(data);
  response.send(result);
});
app.listen(PORT, () => console.log("App is started in", PORT));
