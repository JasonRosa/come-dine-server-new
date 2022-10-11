const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");


const saltRounds = 10;

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("the token: (or not)", req.payload);

  res.status(200).json(req.payload);
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { username, password, city } = req.body;

  if (!username) {
    return res.status(400).json({ errorMessage: "Need a username" });
  }

  if (password.length < 8) {
    return res.status(400).json({ errorMessage: "Password not 8 characters" });
  }

  User.findOne({ username }).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username taken" });
    }
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          username,
          password: hashedPassword,
          city,
        });
      })
      .then((user) => {
        req.session.user = user;
        res.status(201).json(user);
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "Username taken",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username) {
    return res.status(400).json({
      errorMessage: "Please provide your username",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Password not 8 characters",
    });
  }

  /* if (!city) {
    return res.status(400).json({
      errorMessage: 'We need to know what city you live in',
    });
  }*/

  User.findOne({ username })
    .lean()
    .then((user) => {
      if (!user) {
        return res.status(400).json({ errorMessage: "Wrong credentials." });
      }

      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).json({ errorMessage: "Wrong credentials." });
        }

        let id = user?._id;
        let username = user?.username;

        const payload = { id, username };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "14d",
        });

        return res.status(200).json({ authToken: authToken, userId: id });
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.json({ message: "Done" });
  });
});

module.exports = router;
