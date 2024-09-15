import Author from "../Models/Author.js";
import User from "../Models/User.js";

export const newAuthor = async (req, res) => {
  const { name, bio, publishion, accolades, walletId } = req.body;
  const userId = req.userId;

  try {
    const author = await Author.create({
      name,
      bio,
      publishion,
      walletId,
      accolades,
    });

    await User.findByIdAndUpdate(userId, {
      authorId: author._id,
    });

    return res.status(201).json({ message: "Author Id Created", author });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editAuthor = async (req, res) => {
  const { authorId, bio, accolades, walletId } = req.body;

  try {
    const author = await Author.findByIdAndUpdate(
      authorId,
      {
        bio,
        walletId,
        accolades,
      },
      { new: true }
    ).populate("books");

    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", author });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
