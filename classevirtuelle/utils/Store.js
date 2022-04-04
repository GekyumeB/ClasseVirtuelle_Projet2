import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

//Set les états selon les données stocké dans les coockies. C'est données sont stocké lors de la connections.
export const Store = createContext();
const initialState = {
  //Nom de l'utilisateur
  userName: Cookies.get('userName')
    ? JSON.parse(JSON.stringify(Cookies.get('userName')))
    : null,
  //Compte utilisateur
  user: Cookies.get('user')
    ? JSON.parse(JSON.stringify(Cookies.get('user')))
    : null,
};

//Reducer stockant les états selon les actions effectués.
function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, user: action.payload };
    case 'USER_NAME':
      return { ...state, userName: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userName: null,
        user: null,
      };

    default:
      return state;
  }
}

//Donne accèes des états aux pages.
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
