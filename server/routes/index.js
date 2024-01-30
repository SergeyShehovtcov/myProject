const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const brandRouter = require("./brandRouter");
const productRouter = require("./productRouter");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/product", productRouter);

module.exports = router;
