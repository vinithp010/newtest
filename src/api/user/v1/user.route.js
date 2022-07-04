const router = require("express").Router();
const controller = require("./user.controller");

router.post("/", controller.register);
router.get("/", controller.getuser);
router.get("/registerconfirm/:email", controller.registerconfirm);
router.post("/login", controller.login);
router.get("/search/user", controller.usersearch);
router.get("/:userId", controller.removeuser);
router.post("/addtweet", controller.addtweet);
router.get("/readalltweet/:id", controller.readalltweet);
router.get("/removetweet/:id", controller.removetweet);
router.get("/followuser", controller.removetweet);
router.get("/tweetsearch", controller.tweetsearch);
router.get("/hashtagsearch", controller.hashtagsearch);


module.exports = router;
