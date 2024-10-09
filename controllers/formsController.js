const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 30 characters.";
const numErr = "must only contain numbers";
const passLengthErr = "must be between 1 and 10 numbers";
const messageLengthErr = "Your message must be between 1 and 280 characters";

const validateUser = [
  body("fullName")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage(`Full Name ${alphaErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Full name ${lengthErr}`),
  body("username")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Username ${lengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Password: ${lengthErr}`),
];

const validatePasscode = [
  body("passcode")
    .trim()
    .isNumeric()
    .withMessage(`Passcode ${numErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Passcode ${passLengthErr}`),
];

const validateMessage = [body("message").trim().isLength({ min: 1, max: 280 })];

exports.postSignUp = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      await pool.query(
        "INSERT INTO users (full_name, username, password, role) VALUES ($1, $2, $3, $4)",
        [req.body.fullName, req.body.username, hashedPassword, "user"]
      );
      res.redirect("/");
    });
  },
];

exports.postMemberEnrollment = [
  validatePasscode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("memberEnrollment", {
        title: "Member Enrollment",
        errors: errors.array(),
        user: req.user,
      });
    }

    const passcode = "12345"; //make enviornment variable
    if (req.body.passcode === passcode) {
      await pool.query("UPDATE users SET role = 'member' WHERE id = ($1)", [
        req.user.id,
      ]);
      res.redirect("/");
      //add a success message on the homepage after redirect
    } else {
      const newErrors = [{ msg: "Incorrect Passcode." }];
      return res.status(400).render("memberEnrollment", {
        title: "Member Enrollment",
        errors: newErrors,
        user: req.user,
      });
    }
  },
];

exports.postAdminEnrollment = [
  validatePasscode,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("AdminEnrollment", {
        title: "Admin Enrollment",
        errors: errors.array(),
        user: req.user,
      });
    }

    const passcode = "23456"; //make enviornment variable
    if (req.body.passcode === passcode) {
      await pool.query("UPDATE users SET role = 'admin' WHERE id = ($1)", [
        req.user.id,
      ]);
      res.redirect("/");
      //add a success message on the homepage after redirect
    } else {
      const newErrors = [{ msg: "Incorrect Passcode." }];
      return res.status(400).render("adminEnrollment", {
        title: "Admin Enrollment",
        errors: newErrors,
        user: req.user,
      });
    }
  },
];

exports.postCreateMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        title: "Members Only",
        errors: errors.array(),
        user: req.user,
      });
    }

    await pool.query(
      "INSERT INTO messages (user_id, title, timestamp, message_content) VALUES ($1, $2, $3, $4)",
      [req.user.id, req.body.title, new Date().toISOString(), req.body.message]
    );
    res.redirect("/");
  },
];
