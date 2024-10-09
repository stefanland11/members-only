const db = require("../db/queries");

const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  res.render("index", {
    user: req.user,
    messages: messages,
    successMessage: successMessage,
    errorMessage: errorMessage,
  });
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

const getAdminEnrollment = (req, res) => {
  res.render("adminEnrollment", { user: req.user });
};

const getAccount = (req, res) => {
  const user = req.user;
};

const postDeleteMessage = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.deleteMessage(id);

    console.log(result);
    if (result === 1) {
      req.flash("success", "Message deleted successfully");
    } else {
      req.flash("error", "Message not found");
    }
  } catch (err) {
    console.error("Error executing delete query:", err);
    req.flash("error", "Error execution delete query");
    throw err;
  }
  res.redirect("/");
};

module.exports = {
  getIndex,
  getLogOut,
  getSignUp,
  getAccount,
  getMemberEnrollment,
  getAdminEnrollment,
  postDeleteMessage,
};
