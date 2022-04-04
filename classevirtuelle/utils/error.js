import db from './db';

//Recois les erreur de la database
const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message;
//Recois les erreurs et les stockents
const onError = async (err, req, res, next) => {
  await db.disconnect();
  res.status(500).send({ message: err.toString() });
};
export { getError, onError };
