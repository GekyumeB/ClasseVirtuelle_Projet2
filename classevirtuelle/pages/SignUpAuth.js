import { useRouter } from 'next/router';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

const Register = () => {
  //Handler du form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Snackbar de notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Router
  const router = useRouter();

  //État de l'utilisateur connecté
  const { state, dispatch } = useContext(Store);
  const { user } = state;
  if (user) {
    router.push('/');
  }

  //Handler lorsque le form est soumis, contenant tout l'information.
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
  return (
    <div>
      <head>
        <title>Classe Virtuelle</title>
      </head>

      {/*BODY*/}
      <div className="bg-gg   items-center justify-center">
        <p className="text-blue-400 flex justify-center  flex-row opacity: 1 font-text pt-16 text-xl md:text-2xl lg:text-4xl  text-center">
          Sign Up
        </p>

        <div className="bg-gg items-center  justify-center flex h-3/5">
          <div className="bg-gb rounded-lg m-8 md:m-16  md:w-3/5   md:rounded-lg  lg:m-16  lg:w-2/5   lg:rounded-lg">
            <p className="text-white mt-8 ml-8 text-left flex-row opacity: 1 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
              Créer un compte pour pouvoir joindre votre cours.
            </p>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="ml-8">
                <p className="text-white text-opacity-30  mt-8 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
                  Username:
                </p>

                {/*Textfield pour le nom*/}
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      className="w-3/5"
                      inputProps={{ type: 'name' }}
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === 'minLength'
                            ? 'Name length is more than 1'
                            : 'Name is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>

                <p className="text-white text-opacity-30  mt-8 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
                  Email Address:
                </p>

                {/*Textfield pour le email, avec verification*/}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,

                    pattern:
                      /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      className="w-3/5"
                      variant="outlined"
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is not valid'
                            : 'Email is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>

                <p className="text-white text-opacity-30  mt-8 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
                  Password:
                </p>

                {/*Textfield pour le password*/}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      className="w-3/5"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === 'minLength'
                            ? 'Password length is more than 5'
                            : 'Password is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </div>

              <button
                type="submit"
                className="border-2 rounded px-5 mt-8 ml-8 py-2 w-56 border-blue-400 text-blue-400 hover:border-gray-500 md:px-8 "
              >
                Sign Up
              </button>
            </form>

            <div className="items-center mb-8 flex">
              <p className="text-white text-opacity-30 ml-8 mt-12 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-ml lg:text-ml  ">
                Already signed up? Log in here:
              </p>
              <button
                onClick={() => router.push('/LogIn')}
                className="border-2 rounded w-24 ml-8 mr-8 mt-16 lg:w-24 md:w-24 lg:px-5 lg:mt-16 lg:ml-8 lg:py-2 lg:min-w-38  md:mt-16 md:ml-8 md:py-2 lg:min-w-38 border-blue-400 text-blue-400 hover:border-gray-500 md:px-8 "
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
