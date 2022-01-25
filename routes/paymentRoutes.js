const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middlewares/Auth");
const authAdmin = require("../middlewares/AuthAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentController.getPayments)
  .post(auth, paymentController.createPayment);

module.exports = router;
