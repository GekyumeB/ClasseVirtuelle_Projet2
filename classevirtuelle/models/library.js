import mongoose from 'mongoose';

//Modèle d'une librairie dans la database
const librarySchema = new mongoose.Schema(
  {
    gameName: { type: String, required: true },
    userAccount: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Library =
  mongoose.models.Library || mongoose.model('Library', librarySchema);

export default Library;
