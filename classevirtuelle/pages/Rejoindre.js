import { useRouter } from 'next/router';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';


function Home() {
  const router = useRouter();

  const submitHandler = async ({ name, email, password }) => {
    //Ferme la notification.
    closeSnackbar();
    try {
      //Requête ajax pour la création d'un nouvelle utilisateur.
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });

      //Envoie les état du compte et du nom de l'utilisateur.
      dispatch({ type: 'USER_NAME', payload: data.name });
      dispatch({ type: 'USER_LOGIN', payload: data.email });

      //Entre les information de l'utilisateur dans les cookies de l'application.
      Cookies.set('userName', data.name);
      Cookies.set('user', data.email);
    } catch (err) {
      //Affiche l'erreur reçu.
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };


  //Page contenat les informations de contactes.
  return (
    <div>
      <head>
        <title>Classe Virtuelle</title>
      </head>
      {/*BODY*/}
      <div className="bg-gg h-screen ">
        <p className="text-blue-400 opacity: 1 font-logo pt-6 text-3xl md:text-3xl lg:text-5xl text-md text-center ">
          Rejoindre une Classe Virtuelle
        </p>
        <p className="text-blue-400 opacity: 1 font-text pt-6 text-xl md:text-xl mt-24 ml-16 lg:text-2xl  ">
          Entrer le nom de la classe virtuelle que vous désirez joindre
        </p>
        <form action="http://www.acme.com/register" method="POST">
          <label for="name">Nom de la classe : </label>
          <input id="name" type="text" autocomplete="name" required />
          <button type="submit">Register</button>
        </form>
        
      </div>
    </div>
  );
}

export default Home;
