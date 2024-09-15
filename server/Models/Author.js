import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    publishion: { type: String, required: true, unique: true },
    bio: { type: String },
    books: { type: [mongoose.Schema.ObjectId], ref: "Books", default: [] },
    walletId: { type: String },
    accolades: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const AuthorModel = mongoose.model("Author", AuthorSchema);
export default AuthorModel;
