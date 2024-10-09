const { Router } = require("express");

const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.getIndex);
indexRouter.get("/sign-up", indexController.getSignUp);
indexRouter.get("/log-out", indexController.getLogOut);
indexRouter.get("/member-enrollment", indexController.getMemberEnrollment);
indexRouter.get("/admin-enrollment", indexController.getAdminEnrollment);
indexRouter.get("/account/", indexController.getAccount);
indexRouter.post("/delete-message/:id", indexController.postDeleteMessage);

module.exports = indexRouter;
