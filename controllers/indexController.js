const db = require("../db/queries");

const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { user: req.user, messages: messages });
  console.log(req.user);
};

const getLogOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const getSignUp = (req, res) => res.render("sign-up-form");

const getMemberEnrollment = (req, res) => {
  res.render("memberEnrollment", { user: req.user });
};

const getAccount = (req, res) => {
  const user = req.user;
};

module.exports = {
  getIndex,
  getLogOut,
  getSignUp,
  getAccount,
  getMemberEnrollment,
};
