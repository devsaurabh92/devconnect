const express = require("express");
const router = express.Router();

//@route   api/users/test
//@desc    Test users route
//@access  public
router.get("/test", (req, res) => res.json({ msg: "User Works!" }));

module.exports = router;