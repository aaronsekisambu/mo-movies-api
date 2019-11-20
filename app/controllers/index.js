import models from "../models";
import Auth from "../helpers/auth";

const { users, movies, watchedMovies } = models;

export const userAuthentications = {
  signUp: async (req, res) => {
    const { email, firstName, lastName, roles, password, username } = req.body;
    // Hash the password and encrypt it
    const hashedPassword = Auth.passwordHash(password);
    try {
      // save the user in database
      const saveUser = await users.create({
        email,
        firstName,
        lastName,
        roles,
        password: hashedPassword,
        username
      });

      // return the response with the corresponding user data
      return res.status(201).send({
        status: res.statusCode,
        user: saveUser
      });
    } catch (error) {
      // return the error incase of the errors
      return res.status(500).send({
        status: res.statusCode,
        error: error.message
      });
    }
  },

  login: async (req, res) => {
    // get the email and password from the user
    const { email, password } = req.body;
    try {
      // find the user with the dedicated email in database
      const user = await users.findOne({
        where: { email }
      });
      // if the user is not found then return a meaningfully message
      if (user === null) {
        return res.status(404).send({
          status: res.statusCode,
          message: "This user is not registered"
        });
      }

      // if user is found then check if password matches
      if (!Auth.passwordCompare(user.password, password)) {
        return res.status(400).send({
          status: res.statusCode,
          message: "The Password is Wrong"
        });
      }
      // if passwords match generate the token and return the response
      const token = Auth.generateToken(user.id);
      return res.status(200).send({
        status: res.statusCode,
        token,
        lastName: user.lastName,
        firstName: user.firstName,
        avatar: user.avatar,
        email: user.email,
        roles: user.roles,
        username: user.username
      });
    } catch (error) {
      // return the error incase they are thrown
      console.log(error);
      return res.status(500).send({
        status: res.statusCode,
        error: "Server error"
      });
    }
  },

  getProfile: async (req, res) => {
    // get the username from params
    const { username } = req.params;
    try {
      // find the user with the username in database
      const user = await users.findOne({ where: { username } });
      // if the user is not found then we return the error
      if (user === null) {
        return res.status(404).send({
          status: res.statusCode,
          message: "The Profile for this is not available"
        });
      }

      // if the user is found then we return the user's datas
      return res.status(200).send({
        status: res.statusCode,
        user
      });
    } catch (error) {
      // return the error in case of the error
      return res.status(500).send({
        status: res.statusCode,
        error: "Server error"
      });
    }
  }
};

export const moviesTable = {
  getMovies: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await users.findOne({ where: { username } });
      const movie = await movies.findAll({ where: { userId: user.id } });
      if (movie === null) {
        return res.status(404).send({
          status: res.statusCode,
          message: "No Movies"
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        movie
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: res.statusCode,
        error: "Server error"
      });
    }
  },
  getMoviesWatched: async (req, res) => {
    const { username } = req.params;
    try {
      const user = await users.findOne({ where: { username } });
      const movieWatched = await watchedMovies.findAll({ where: { userId: user.id } });
      if (movieWatched === null) {
        return res.status(404).send({
          status: res.statusCode,
          message: "No movies watched yet, login to start watching"
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        watched: movieWatched.length
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        error: "Server error"
      });
    }
  }
};


