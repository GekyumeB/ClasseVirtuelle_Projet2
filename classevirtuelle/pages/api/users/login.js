import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  //Cennection
  await db.connect();

  //Chercher la base de donnée pour le compte entré
  const user = await User.findOne({ email: req.body.email });

  //Compare le mot de passe entré et le mot de passe encrypter
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);

    //Stock tout les données de l'utilisateur
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      Admin: user.Admin,
    });
  } else {
    //Si l'information entré est incorrect
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

export default handler;
