import jwt from 'jsonwebtoken';

//Web token signé avec l'information de l'utilisateur
const signToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email, Admin: user.Admin },
    process.env.JWT_SECRET,
    {
      //Expire dans 30 jours
      expiresIn: '30d',
    }
  );
};

export { signToken };
