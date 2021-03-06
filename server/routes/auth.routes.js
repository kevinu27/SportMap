const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("./../models/User.model");

// Signup (post)
router.post("/signup", (req, res) => {
  const { name, pwd, email } = req.body;
  console.log("name", name);
  User.findOne({ name })
    .then((user) => {
      if (user) {
        res.status(400).json({ code: 400, message: "Username already exixts" });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(pwd, salt);

      User.create({ name, pwd: hashPass, email })
        .then(() => res.json({ code: 200, message: "User created" }))
        .catch((err) =>
          res
            .status(500)
            .json({ code: 500, message: "DB error while creating user", err })
        );
    })
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "DB error while fetching user", err })
    );
});

// Login (post)
router.post("/login", (req, res) => {
  const { name, pwd } = req.body;

  User.findOne({ name })
    .then((user) => {
      if (!user) {
        res.status(401).json({ code: 401, message: "Username not registered" });
        return;
      }

      if (bcrypt.compareSync(pwd, user.pwd) === false) {
        res.status(401).json({ code: 401, message: "Incorect password" });
        return;
      }

      req.session.currentUser = user;
      res.json(req.session.currentUser);
      console.log("login succesful");
    })
    .catch((err) =>
      res
        .status(500)
        .json({ code: 500, message: "DB error while fetching user", err })
    );
});

router.get("/profile/:_id", (req, res) => {
  const idFromParam = req.params._id;
  console.log("params del profile", req.params._id);
  // Match.find({ match: [ { teams: [{ members: $in: [_id: idFromParam ] } ] ] }})
  User.findById(idFromParam)
    .then((response) => {
      res.json(response);
      console.log("response del perfil", response);
    })
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Error fetching", err })
    );
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => res.json({ mssage: "Logout successful!!!" }));
});

router.post("/isloggedin", (req, res) => {
  console.log("req.session.currentUser", req.session.currentUser);
  req.session.currentUser
    ? res.json(req.session.currentUser)
    : res.status(401).json({ code: 401, message: "Unauthorized" });
});

router.put("/profileUpdate/:_id", (req, res) => {
  const userId = req.params._id;
  const user = req.body;

  console.log("userId", userId);
  console.log("user", user);
  User.findByIdAndUpdate(userId, user)
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Error editing user", err })
    );
});

// router.get("/getAllPlayers", (req, res) => {
//   User.find()
//     .then((users) => {
//       console.log("users", users);
//       res.json(users);
//     })
//     .catch((err) =>
//       res
//         .status(500)
//         .json({ code: 500, message: "DB error while fetching user", err })
//     );
// });

module.exports = router;
