const express = require("express");
const clothesController = require("../controllers/clothesController");

const router = express.Router();

router.get("/", clothesController.clothes_index);
router.get("/add", clothesController.clothes_create_get);
router.get("/:id", clothesController.clothes_details);
router.post("/", clothesController.clothes_create_post);
router.delete("/:id", clothesController.clothes_delete);
router.get("/update/:id", clothesController.clothes_update_get);
router.post("/update/:id", clothesController.clothes_update_post);

module.exports = router;
