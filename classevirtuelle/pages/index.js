import React, { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//import ButtonLoader from "../layout/ButtonLoader";

import { getSession } from "next-auth/client";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = "/chat";
    }
  };

  return (
    <div >
      {/*&&&&&&&&&&&&&&&&&&&&&&&&&&&*/}
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
      </div>
    </div>
      {/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/}
      <div className="flex min-h-[90vh] justify-center items-center bg-black h-screen">
      <div className="w-[35%] h-[70vh] bg-slate-900 rounded-lg relative flex z-20  border-solid border-[1px] border-slate-400">
        <div className="flex items-center px-[20px] w-full">
          <div className="h-full w-full flex flex-col justify-center">
            <div className="flex justify-center items-center mb-[30px]">
              <h2 className="flex justify-center text-[40px] text-slate-400 font-bold ml-[10px] uppercase">
                {" "}
                LOGIN
              </h2>
            </div>
            <form className="flex flex-col" onSubmit={submitHandler}>
              <div className="flex flex-col justify-center">
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
                    minLength={6}
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
              <div className="flex justify-center my-[10px]">
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="w-[170px] text-[16px] font-[600] text-slate-300 bg-blue-500 cursor-pointer m-[20px] 
                  h-[50px] text-center border-none bg-[length:300%_100%]"
                >
                  {loading ? "Connection....." : "Connection"}
                </button>
              </div>
            </form>
          </div>
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
        destination: "/chat",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}


