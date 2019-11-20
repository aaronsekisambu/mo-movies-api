import express from "express";
import { userAuthentications, moviesTable } from "../controllers/index";
import Auth from '../helpers/auth'
export const router = express.Router();

router.post("/api/v1/signup", userAuthentications.signUp);
router.post("/api/v1/login", userAuthentications.login);
// apply the middleware to give access to logged in users.
router.get("/api/v1/profile/:username", Auth.checkToken, userAuthentications.getProfile);
router.get("/api/v1/movies/:username", Auth.checkToken, moviesTable.getMovies);
router.get("/api/v1/movies/watched/:username", Auth.checkToken, moviesTable.getMoviesWatched);
