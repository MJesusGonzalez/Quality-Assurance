const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = function (app, myDataBase) {
  // Be sure to change the title
  app.route("/").get((req, res) => {
    // Change the response to render the Pug template
    res.render("index", {
      title: "Connected to Database",
      message: "Please login",
      // parte 7
      showLogin: true,
      // parte 11
      showRegistration: true,
      // parte 13
      showSocialAuth: true,
    });
  });

  // parte 7
  app
    .route("/login")
    .post(
      passport.authenticate("local", { failureRedirect: "/" }),
      (req, res) => {
        res.redirect("/profile");
      }
    );

  app.route("/profile").get(ensureAuthenticated, (req, res) => {
    // parte 8
    res.render("profile", { username: req.user.username });
  });

  // parte 9
  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  // parte 10
  app.route("/register").post(
    (req, res, next) => {
      // parte 11
      const hash = bcrypt.hashSync(req.body.password, 12);
      myDataBase.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          res.redirect("/");
        } else {
          myDataBase.insertOne(
            {
              username: req.body.username,
              password: hash,
            },
            (err, doc) => {
              if (err) {
                res.redirect("/");
              } else {
                // The inserted document is held within
                // the ops property of the doc
                next(null, doc.ops[0]);
              }
            }
          );
        }
      });
    },

    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
      res.redirect("/profile");
    }
  );

  // parte 14
  app.route("/auth/github").get(passport.authenticate("github"));
  app
    .route("/auth/github/callback")
    .get(
      passport.authenticate("github", { failureRedirect: "/" }),
      (req, res) => {
        res.redirect("/chat");
      }
    );

  // parte 17
  app.route("/chat").get(ensureAuthenticated, (req, res) => {
    res.render(process.cwd() + "/view/pug/chat", { user: req.user });
  });

  // parte 9
  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};

// parte 8
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
