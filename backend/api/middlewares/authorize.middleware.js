const Book = require("../../src/models/book.model");
module.exports = () => async (req, res, next) => {
  let permission = false;
  const { id } = req.params;
  const userChanging = await Book.findOne({ _id: id });
  const user = req.user;
  if (user.admin === true || userChanging.author.toString() == user._id) {
    permission = true;
  }

  if (permission === false) {
    return res.status(403).json("Permission Denied");
  }
  return next();
};
