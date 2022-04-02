const express = require("express");
const { authenticate } = require("../middlewares/authenticate.middleware");
const authorize = require("../middlewares/authorize.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Book = require("../../src/models/book.model");
const router = express.Router();
router.post("", authenticate, async (req, res) => {
  try {
    const item = await Book.create({
      ...req.body,
      author: req.user._id,
    });

    return res.send(item);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const books = await Book.find({ _id: id });

    return res.send(books);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", [authenticate, authorize()], async (req, res) => {
  try {
    console.log(req.user);
    const product = await Book.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.delete("/:id", [authenticate, authorize()], async (req, res) => {
  try {
    console.log(req.user);
    const product = await Book.findByIdAndDelete(req.params.id);

    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
module.exports = router;
