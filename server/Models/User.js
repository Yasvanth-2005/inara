import mongoose from "mongoose";

const readingBooksTypeSchema = new mongoose.Schema({
  bookId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }],
  pagesRead: { type: Number, default: 0 },
});

const transactionHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  bookId: { type: String, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    favGenres: { type: [String], default: [] },
    image: { type: String, default: "" },
    authorId: { type: mongoose.Schema.ObjectId, ref: "Author" },
    transactionHistory: { type: [transactionHistorySchema], default: [] },
    booksHistory: { type: [readingBooksTypeSchema], default: [] },
    readingBooksHistory: {
      type: [mongoose.Schema.ObjectId],
      ref: "Books",
      default: [],
    },
    savedBooks: { type: [mongoose.Schema.ObjectId], ref: "Books", default: [] },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
