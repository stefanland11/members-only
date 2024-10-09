const { Router } = require("express");

const formsController = require("../controllers/formsController");
const formsRouter = Router();

formsRouter.post("/sign-up", formsController.postSignUp);

formsRouter.post("/member-enrollment", formsController.postMemberEnrollment);

formsRouter.post("/admin-enrollment", formsController.postAdminEnrollment);

formsRouter.post("/create-message", formsController.postCreateMessage);


module.exports = formsRouter;
