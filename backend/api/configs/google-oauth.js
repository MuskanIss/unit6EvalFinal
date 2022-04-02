const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../../src/models/user.model");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const newToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "736074868957-l7626lkdvbtr79ah4fkvp7ksdqgaeisn.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile._json.email });
      if (user) {
        user = await User.findOne({ email: profile._json.email });
      } else {
        user = await User.create({
          name: profile._json.name,
          email: profile._json.email,
        });
      }
      // console.log(user);
      let token = newToken(user);
      request.token = token;
      return done(null, token);
    }
    // callback with num and hte user object
  )
);

module.exports = passport;
