import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  //Connection
  await db.connect();

  //Creation d'un nouvelle utilisateur dans la base de données.
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,

    //Encryption du mot de passe
    password: bcrypt.hashSync(req.body.password),
    Admin: false,
  });

  //Sauvgarde des données de l'utilsateur et creation du web token
  const user = await newUser.save();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    Admin: user.Admin,
  });
});

export default handler;
