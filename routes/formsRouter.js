const { Router } = require("express");

const formsController = require("../controllers/formsController");
const formsRouter = Router();

formsRouter.post("/sign-up", formsController.postSignUp);

formsRouter.post("/member-enrollment", formsController.postMemberEnrollment);

module.exports = formsRouter;