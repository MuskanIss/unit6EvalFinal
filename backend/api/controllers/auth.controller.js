const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user.model");
const passport = require("../configs/google-oauth");

passport.serializeUser(function (token, done) {
  done(null, token);
});

passport.deserializeUser(function (token, done) {
  done(null, token);
});

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: `${process.env.URL}/users/getToken`,
    failureRedirect: "/404",
  }),
  (req, res) => {
    return res.redirect(`http://localhost:3000/code=${req.token}`);
  }
);
const newToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

module.exports = router;
