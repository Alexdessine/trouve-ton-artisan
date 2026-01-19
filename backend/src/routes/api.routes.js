const express = require("express");
const categoriesRoutes = require("./categories.routes");
const artisansRoutes = require("./artisans.routes");
const contactRoutes = require("./contact.routes");

const router = express.Router();

router.use("/categories", categoriesRoutes);
router.use("/artisans", artisansRoutes);

// IMPORTANT : contactRoutes contient déjà "/contact"
router.use("/", contactRoutes);

module.exports = router;
