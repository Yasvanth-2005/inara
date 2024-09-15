import Books from "../Models/Books.js";
import Author from "../Models/Author.js";
import User from "../Models/User.js";

export const newBook = async (req, res) => {
  const { title, author, price, summary, genres, keywords } = req.body;
  const bookCover = req.file ? req.file.filename : null;

  try {
    const book = await Books.create({
      title,
      author,
      image: bookCover,
      price,
      summary,
      genres,
      keywords,
    });

    book.populate("author");
    await Author.findByIdAndUpdate(author, { $push: { books: book._id } });

    return res
      .status(201)
      .json({ book, message: "Book Uploaded Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeSavedBook = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { savedBooks: id },
    });

    return res.status(200).json({ message: "Removed Successfully" });
  } catch {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const saveBook = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(userId, {
      $push: { savedBooks: id },
    }).populate();

    return res.status(200).json({ message: "Saved Successfully" });
  } catch {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("author");
    return res.status(200).json({ books });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSearchBooks = async (req, res) => {
  const { search } = req.params;

  try {
    const books = await Books.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { publisher: { $regex: search, $options: "i" } },
        { keywords: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("author");

    return res.status(200).json({ books });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Books.findById(id).populate("author");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
