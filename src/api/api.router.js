const router = require("express").Router();

router.use("/user", require("./user/user.versions"));


module.exports = router;
