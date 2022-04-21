import express, { request, response } from "express";
const router = express.Router();
import {
  FilteringMovies,
  CreateMovie,
  FindMovie,
  DeleteMovie,
  UpdateMovie,
  Post1movie,
} from "../CreateMovie.js";
// import { auth } from "../middleware/auth.js";

router
  .route("/")
  .get(async (request, response) => {
    console.log(request.query);
    const filter = request.query;
    console.log(filter);
    if (filter.rating) {
      filter.rating = parseFloat(filter.rating);
    }
    const filterMovies = await FilteringMovies(filter); //to see the full data without cursor
    console.log(filterMovies);
    response.send(filterMovies);
  })
  .post(async (request, response) => {
    const data = request.body;
    const result = await CreateMovie(data);
    response.send(result);
  })
  .post(async (request, response) => {
    const data = request.body;
    const result1 = await Post1movie(data);
    response.send(result1);
  });

// find one data
router
  .route("/:id")
  .get(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    // const movie = movies.find((mv) => mv.id === id);
    const movie = await FindMovie(id);
    console.log(movie);
    movie
      ? response.send(movie)
      : response.status(404).send({ message: "No match movie found" });
  })
  .delete(async (request, response) => {
    console.log(request.params);
    const { id } = request.params;
    console.log(id);
    const movie = await DeleteMovie(id);
    console.log(movie);
    movie.deletedCount > 0
      ? response.send(movie)
      : response.status(404).send({ message: "No matching movie found" });
  })
  .put(async (request, response) => {
    const data = request.body;
    const { id } = request.params;
    const result = await UpdateMovie(id, data);
    response.send(result);
  });

export const moviesRouter = router;
