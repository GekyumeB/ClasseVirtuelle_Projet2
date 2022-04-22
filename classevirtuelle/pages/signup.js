import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { toast } from "react-toastify";
//import ButtonLoader from "../layout/ButtonLoader";

import { getSession } from "next-auth/client";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../redux/actions/userActions";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeCompte, setTypeCompte] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dhouw3lii/image/upload/v1640038268/bookit/default_avatar_xu6ucl.png"
  );

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const isUser = Object.values({
      firstname,
      lastname,
      email,
      password,
      typeCompte,
    }).every((item) => Boolean(item));

    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [firstname, lastname, email, password, typeCompte]);

  useEffect(() => {
    if (success) {
      router.push("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name: firstname + " " + lastname,
      email,
      password,
      avatar,
      role:typeCompte,
    };
    console.log(typeCompte);
    console.log(userData);
    dispatch(registerUser(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-[90vh] justify-center items-center bg-black h-screen">
      <div className="w-[35%] h-[100vh] bg-slate-900 rounded-lg relative flex z-20  border-solid border-[1px] border-slate-400">
        <div className="flex items-center px-[20px] w-full">
          <div className="h-full w-full flex flex-col justify-center">
            <div className="flex justify-center items-center my-[30px]">
              <h2 className="flex justify-center text-[40px] text-slate-400 font-bold ml-[10px] uppercase">
                Sign Up
              </h2>
            </div>
            <form className="flex flex-col" onSubmit={submitHandler}>
              <div className="flex flex-col justify-center">
                <div className="flex items-center w-[85%] p-[15px] ml-[5%] bg-slate-300 mb-[15px]">
                  <input
                    className="w-full pl-[10px] border-non outline-none text-[13px] bg-slate-300 placeholder:text-black"
                    type="text"
                    placeholder="Prénom"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center w-[85%] p-[15px] ml-[5%] bg-slate-300 mb-[15px]">
                  <input
                    className="w-full pl-[10px] border-none outline-none text-[13px] bg-slate-300 placeholder:text-black"
                    type="text"
                    placeholder="Nom"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center w-[85%] p-[15px] ml-[5%] bg-slate-300 mb-[15px]">
                  <input
                    className="w-full pl-[10px] border-none outline-none text-[13px] bg-slate-300 placeholder:text-black"
                    type="email"
                    placeholder="Courriel"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    required
                  />
                </div>
                <div className="flex items-center w-[85%] p-[15px] ml-[5%] bg-slate-300 mb-[15px]">
                  <input
                    className="w-full pl-[10px] border-none outline-none text-[13px] bg-slate-300 placeholder:text-black"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-[85%] p-[15px] ml-[5%] bg-slate-300 mb-[15px]">
                <i aria-hidden className="fas fa-user-tie text-[12px]"></i>
                <select
                  value={typeCompte}
                  className="w-full pl-[10px] border-none outline-none text-[13px] bg-slate-300 placeholder:text-black"
                  onChange={(e) => setTypeCompte(e.target.value)}
                >
                  {["", "Étudiant", "Professeur", "Administrateur"].map((typeCompte) => (
                    <option key={typeCompte} value={typeCompte}>
                      {typeCompte}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6  font-bold">
                <label className="ml-2 text-slate-400" htmlFor="avatar_upload">
                  Avatar
                </label>
                <div className="mb-6 block font-bold">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-full w-16 h-16"
                        alt="image"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="placeholder:text-black bg-slate-300 rounded border-2 w-full text-left p-1"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choisir un avatar
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mx-[10px]">
                <button
                  disabled={submitDisabled ? true : false}
                  type="submit"
                  className={`w-[170px] text-[16px] font-[600] text-slate-300 ${
                    submitDisabled
                      ? "bg-blue-300"
                      : "bg-blue-500 cursor-pointer"
                  } m-[20px]
                        h-[50px] text-center border-none bg-[length:300%_100%]`}
                >
                  {loading ? "Soumettre...." : "Soumettre"}
                </button>

                <Link href="/">
                  <button
                    className="w-[170px] text-[16px] font-[600] text-slate-300 bg-blue-500 cursor-pointer m-[20px] 
                        h-[50px] text-center border-none bg-[length:300%_100%]"
                  >
                    Retour
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
