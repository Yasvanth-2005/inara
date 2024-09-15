import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "Author",
      required: true,
    },
    image: { type: String },
    price: { type: String, required: true },
    summary: { type: String, required: true },
    genres: { type: [String], required: true },
    keywords: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model("Books", bookSchema);
export default bookModel;
