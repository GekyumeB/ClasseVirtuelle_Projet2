import mongoose from 'mongoose';

//Modèle d'un jeu dans la database
const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    Dev: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.models.Game || mongoose.model('Game', gameSchema);

export default Game;
