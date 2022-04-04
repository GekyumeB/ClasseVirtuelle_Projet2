import React from 'react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { Store } from '../utils/Store';
import { Menu, MenuItem } from '@material-ui/core';
import Cookies from 'js-cookie';

//Layout implémentant la barre de navigation et le page footer
function Layout({ children }) {
  //Router permettant de changer de page
  const router = useRouter();

  //Va chercher le nom de l'utilisateur
  const { state, dispatch } = useContext(Store);
  const { userName } = state;

  //Handler permettant d'afficher un pop up lors du click
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  //Handler qui ferme le pop up quand l'utilisateur clique à l'extérieur
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  // Handler permettant de logout
  const logoutHandler = () => {
    setAnchorEl(null);

    //Reset tout les données de l'utilisateur lors du log out
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('user');
    Cookies.remove('userName');
    router.push('/');
  };

  //Layout de la page (Barre de navigation et footer)
  return (
    <div>
      <div className="bg-gb w-full  h-24 flex space-x-3 items-center justify-center sm:h-24 sm:space-x-8  md:h-24  md:space-x-8  lg:h-20 lg:space-x-16 ">
        <div className="bg-gb items-center  ">
          <div>
            <p className="text-blue-400 opacity: 1 font-logo md:text-xl lg:text-3xl text-md text-center">
              Classe
            </p>
          </div>
          <p className="text-blue-400 opacity: 1 font-logo  text-md md:text-xl lg:text-3xl ">
            Virtuelle
          </p>
        </div>

        <p
          onClick={() => router.push('/')}
          className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
        >
          Info
        </p>
        <p
          onClick={() => router.push('/Rejoindre')}
          className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
        >
          Rejoindre une classe
        </p>
        <p
          onClick={() => router.push('/Creation')}
          className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
        >
          Création de classe
        </p>

        {/*Si un utilisateur est connecté, sont nom est affiché */}
        {userName ? (
          <>
            <p
              onClick={loginClickHandler}
              className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
            >
              {userName}
            </p>

            {/*Un pop up est affiché si l'utilisateur clique sur le nom */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={loginMenuCloseHandler}
            >
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <p
            onClick={() => router.push('/LogIn')}
            className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
          >
            Login
          </p>
        )}

      </div>
      {/*Contenu de la page présente*/}
      {children}
      <div className="bg-gg flex  space-x-1 items-center justify-center md:space-x-8 md:pt-8 lg:space-x-24">
        <button
          onClick={() => router.push('/')}
          className="border-2 rounded px-3 mb-8 py-2 w-38 border-blue-400 text-blue-400 hover:border-gray-500 md:px-5"
        >
          Info
        </button>
        <button
          onClick={() => router.push('/store')}
          className="border-2 rounded px-3 mb-8 py-2 w-38 border-blue-400 text-blue-400 hover:border-gray-500 md:px-5"
        >
          Rejoindre
        </button>
        <button
          onClick={() => router.push('/library')}
          className="border-2 rounded px-3 mb-8 py-2 w-38  border-blue-400 text-blue-400 hover:border-gray-500 md:px-5 "
        >
          Création
        </button>
        <button
          onClick={() => router.push('/LogIn')}
          className="border-2 rounded px-5 mb-8 py-2 min-w-38 border-blue-400 text-blue-400 hover:border-gray-500 md:px-8 "
        >
          Log In
        </button>{' '}
      </div>
    </div>
  );
}

export default Layout;
