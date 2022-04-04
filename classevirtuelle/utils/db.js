import mongoose from 'mongoose';

const connection = {};

//Fonction pour la connection à la base de données
async function connect() {
  if (connection.isConnected) {
    return;
  }
  //Si nous somme déja connecté, on retourne.
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }

  //Connection à la base de données
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;
}

//Convertie les objets autres de la base de données en string
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, convertDocToObj };
export default db;
