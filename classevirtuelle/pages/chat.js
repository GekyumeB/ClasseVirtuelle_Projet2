import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { loadUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { signOut } from "next-auth/client";
import Link from "next/link";
import convertTime from '../utils/convertTime'

const socket = io("http://localhost:3000");

export default function chat() {
  const dispatch = useDispatch();
  const router = useRouter();
  const mesageEndRef = useRef(null)

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const [room, setRoom] = useState('')
  const [usersConnect, setUsersConnect] = useState([])

  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
    setRoom('room');
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      socket.emit("joinRoom", { userprofile: user, room: room });
      // Liste personne connecte
      socket.on("roomUsers", ({ room, users }) => {
        setUsersConnect(users);
      });
    }
  }, [user, loading])

  useEffect(() => {
    // Reception des messages
    socket.on("message", (data) => {
      setChat(chat => [...chat, data]);
    });
  }, []);

  const logoutHandler = () => {
    signOut();
  };

  // Scroll au dernier message entre
  useEffect(() => {
    mesageEndRef.current?.scrollIntoView();
  },[chat])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send message
    socket.emit("chatMessage", message);
    setMessage("");
  };

  return (

    <div className="h-full w-full bg-neutral-900">
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
            onClick={() => router.push('/chat')}
            className="link text-blue-400 opacity: 1 font-text text-sm md:text-xl lg:text-2xl motion-safe:hover:scale-110"
          >
            Chat
          </p>
          <Link href="/">
            <a className="p-2 text-white font-semibold bg-red-600 uppercase" onClick={logoutHandler}>
              Quitter
            </a>
          </Link>
        </div>
      </div>
      {/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/}

      <div className="flex justify-center pt-5">

        <div className="bg-cyan-500 mr-2 rounded-[2rem]">
          <div className="mb-3">
            <p>ㅤㅤㅤEn Classeㅤㅤㅤ</p>
          </div>
          {
            usersConnect && usersConnect.map((uc, i) => {
              return (
                <div key={i} className='flex p-2'>
                  <div>
                    {user._id !== uc.userprofile._id ? (
                      <div className="flex uppercase">
                        <div className="mr-3">
                          <span className="absolute text-green-500">
                            <svg className="w-3 h-3">
                              <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
                            </svg>
                          </span>

                          <figure className="w-8 h-8 rounded-full">
                            <img
                              src={uc.userprofile.avatar.url}
                              className="rounded-full "
                            />
                          </figure>
                        </div>

                        {uc.userprofile.name}
                      </div>
                    ) : <></>}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="max-w-2xl border rounded-[2rem] bg-white">
          <div class="grid grid-cols-4 gap-4 bg-cyan-500 rounded-full">
            <div className="relative">
              <span className="absolute w-max text-green-500">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              {user && (
                <figure className="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-full "
                  />
                </figure>
              )}
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3 uppercase font-bold">
                  {user && ` ${user.name}`}

                </span>
              </div>
            </div>
          </div>
          <div className="block overflow-y-scroll max-h-[35rem]">
            <br />
            {chat.map((c) => {
              return (
                <div class="chat2" className="relative w-full p-6 overflow-y-auto h-25">
                  <ul className="space-y-2">
                    <li className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <div className="grid grid-cols-4 gap-4">
                          {
                            c.userId === user._id ? (
                              <div className="flex">                              
                              <div className="block w-max rounded-[2rem] bg-green-100">
                                <div className="flex">
                                  <p className="pl-5 uppercase font-semibold">{c.username}</p> <p className="pl-56 text-xs">{convertTime(c.time)}</p>
                                </div>
                                <div className="min-w-[500px] max-w-[500px] pl-8 font-serif">
                                  {c.text}
                                </div>
                              </div>
                            </div>
                            ) : (
                              <div className="flex">
                                <div className="relative my-auto mr-4">
                                  <span className="absolute w-max text-green-500">
                                    <svg className="w-3 h-3">
                                      <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
                                    </svg>
                                  </span>
                                  {user && (
                                    <figure className="w-8 h-8 rounded-full">
                                      <img
                                        src={c.avatarUrl}
                                        className="rounded-full "
                                      />
                                    </figure>
                                  )}
                                </div>
                                <div className="block w-max rounded-[2rem] bg-blue-100">
                                  <div className="flex">
                                    <p className="pl-5 uppercase font-semibold">{c.username}</p> <p className="pl-52 text-xs">{convertTime(c.time)}</p>
                                  </div>
                                  <div className="min-w-[500px] max-w-[500px] pl-8 font-serif">
                                    {c.text}
                                  </div>
                                </div>
                              </div>
                            )
                          }

                          <div ref={mesageEndRef}/>

                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
            <br />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 grid-flow-col gap-4 items-center justify-between w-full p-3 border-t border-gray-300">
              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="  Tapez votre message ici.."
                  className="block w-full p-2 pl-4 my-3 origin-left bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  required >
                </input>
              </div>
              <div>
                <button type="submit">
                  <svg className="w-10 h-10 mt-10 text-gray-500 origin-right transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    Envoyer
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
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
