const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user.js");

const router = express.Router();


router.post("/signup", (req, res, next) => {
  const { fullName, email, originalPassword } = req.body;

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(userDoc => {
      req.logIn(userDoc, () => {
        userDoc.encryptedPassword = undefined;
        res.json({ userDoc });
      });
    })
    .catch(err => next(err));
});

router.post("/login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        next(new Error("Incorrect email. 🤦‍♂️"));
        return;
      }

      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        next(new Error("Password is wrong. ️🤯"));
        return;
      }

      req.logIn(userDoc, () => {
        userDoc.encryptedPassword = undefined;
        res.json({ userDoc });
      });
    })
    .catch(err => next(err));
});

router.delete("/logout", (req, res, next) => {
  req.logOut();

  res.json({ userDoc: null })
});

router.get("/checklogin", (req, res, next) => {
  if (req.user) {
    req.user.encryptedPassword = undefined;
    res.json({ userDoc: req.user });
  }
  else {
    res.json({ userDoc: null });
  }
});


module.exports = router;
