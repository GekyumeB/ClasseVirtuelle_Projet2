import React, { useEffect } from "react";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/actions/userActions";
import { signOut } from "next-auth/client";

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div>
      <div className="bg-gb w-full h-24 flex space-x-3 items-center justify-center sm:h-24 sm:space-x-8  md:h-24  md:space-x-8  lg:h-20 lg:space-x-16 ">
        <div className="bg-gb items-center mr-52">
          <div>
            <p className="text-blue-400 opacity: 1 font-logo md:text-xl lg:text-3xl text-md text-center">
              Classe
            </p>
          </div>
          <p className="text-blue-400 opacity: 1 font-logo  text-md md:text-xl lg:text-3xl ">
            Virtuelle
          </p>
        </div>

        {
          user && user ? (
            <>
              <Link href="/">
                <a className="p-2 text-white font-semibold bg-red-600 uppercase" onClick={logoutHandler}>
                  Quitter
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signup">
                <a className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110">
                  Signup
                </a>
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Navbar;
