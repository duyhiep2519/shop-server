const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.use("/upload", upload.single("image"), ProductController.upLoad);
router.use("/detail", ProductController.detail);
router.use("/", ProductController.getList);

module.exports = router;
