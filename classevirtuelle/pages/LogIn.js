import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useState } from "react";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import en from "../utils/Language/en";
import fr from "../utils/Language/fr";

function Home() {
  //Router
  const router = useRouter();

  //Snackbar de notification
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //État de l'utilisateur
  const { state, dispatch } = useContext(Store);
  const { user } = state;

  //Variable pour le language selectionné contenue dans les cookies.
  var locale = Cookies.get("lang");

  //Va chercher le fichier de langue selon le language selectionné.
  const t = locale === "en" ? en : fr;

  //si l'utilisateur est déja connecté, il retourne à la page principale.
  if (user) {
    router.push("/");
  }

  //Email et password avec setter.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handler lorsque le form est soumis.
  const submitHandler = async (e) => {
    e.preventDefault();
    closeSnackbar();
    try {
      //Reqête ajax qui va effectué la méthode de connection selon l'information entré.
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      //Envoie l'information de l'utilisateur.
      dispatch({ type: "USER_NAME", payload: data.name });
      dispatch({ type: "USER_LOGIN", payload: data.email });

      //Sauvgarde les données de l'utilisateur dans les cookies.
      Cookies.set("userName", data.name);
      Cookies.set("user", data.email);
    } catch (err) {
      //Montre une erreur dans la snackbar si une est reçu.
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: "error" }
      );
    }
  };

  //Handler de la selection de language.
  const laguageHandler = async () => {
    //Change la langue dans les cookies selon le language selectionné.
    locale === "en" ? Cookies.set("lang", "fr") : Cookies.set("lang", "en");
    router.push("/LogIn");
  };

  return (
    <div>
      <head>
        <title>Classe Virtuelle</title>
      </head>
      <div className="bg-gg  flex justify-end  ">
        <p
          onClick={laguageHandler}
          className="link underline text-blue-400 mr-8 mt-2"
        >
          {locale === "en" ? <>Français</> : <>English</>}
        </p>
      </div>
      {/*BODY*/}
      <div className="bg-gg sm:h-screen  items-center justify-center">
        <p className="text-blue-400 flex justify-center  flex-row opacity: 1 font-text pt-16 text-xl md:text-2xl lg:text-4xl  text-center">
          {t.title}
        </p>

        <div className="bg-gg items-center  justify-center flex h-6/8">
          <div className="bg-gb rounded-lg m-8 md:m-16  md:w-3/5   md:rounded-lg  lg:m-16  lg:w-2/5   lg:rounded-lg">
            <p className="text-white mt-8 ml-16 text-left flex-row opacity: 1 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
              {t.description}
            </p>

            <form onSubmit={submitHandler}>
              <div className="ml-8">
                <p className="text-white text-opacity-30  mt-8 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
                  {t.email}
                </p>

                {/*Textfield pour le email*/}
                <TextField
                  className="w-3/5"
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  inputProps={{ type: "email" }}
                ></TextField>

                <p className="text-white text-opacity-30  mt-8 text-left flex-row opacity: 0.5 font-text pt-4 text-xl md:text-xl lg:text-xl  ">
                  {t.password}
                </p>

                {/*Textfield pour le mot de passe*/}
                <TextField
                  className="w-3/5"
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  inputProps={{ type: "password" }}
                ></TextField>
              </div>
              <button
                type="submit"
                className="border-2 rounded w-24 mt-8 ml-8 lg:px-5 lg:mt-8 lg:ml-8 lg:py-2 lg:w-56  md:mt-8 md:ml-8 md:py-2 md:w-56 border-blue-400 text-blue-400 hover:border-gray-500  md:px-8 "
              >
                {t.loginBTN}
              </button>
            </form>

            <div className="items-center mt-16 mb-8 flex">
              <p className="text-white text-opacity-30  ml-8 sm:text-sm text-left flex-row opacity: 0.5 font-text pt-4 lg:text-xl md:text-ml lg:text-ml  ">
                {t.signuptext}
              </p>
              <button
                onClick={() => router.push("/SignUpAuth")}
                className="border-2 rounded mr-8 lg:px-5 lg:mt-4 lg:ml-8 lg:py-2 lg:min-w-38 border-blue-400 text-blue-400 hover:border-gray-500 md:px-8 md:mr-8 md:mt-4 md:ml-8 md:py-2 lg:min-w-38"
              >
                {t.signupBTN}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
