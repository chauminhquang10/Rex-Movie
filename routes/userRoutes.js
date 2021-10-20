const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/Auth");
const authAdmin = require("../middlewares/AuthAdmin");

router.post("/register", userController.register);

router.post("/activation", userController.activateEmail);

router.post("/login", userController.login);

router.post("/refresh_token", userController.getAccessToken);

router.post("/forgot", userController.forgotPassword);

router.post("/reset", auth, userController.resetPassword);

router.get("/info", auth, userController.getUserInfo);

router.get("/all_info", auth, authAdmin, userController.getAllUsersInfo);

router.get("/logout", userController.logout);

router.patch("/update", auth, userController.updateUserInfo);

//update user permissions with role admin
router.patch(
  "/update_role/:id",
  auth,
  authAdmin,
  userController.updateUsersRole
);

//delete user with role admin
router.delete("/delete/:id", auth, authAdmin, userController.deleteUser);

module.exports = router;
