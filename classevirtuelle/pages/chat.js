import React, { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/client";
import { loadUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatLabel from "../components/ChatLabel";
import Navbar from "../components/Navbar";

const socket = io("http://localhost:3000");

export default function chat() {
  const dispatch = useDispatch();
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

  // Scroll au dernier message entre
  useEffect(() => {
    mesageEndRef.current?.scrollIntoView();
  }, [chat])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send message
    socket.emit("chatMessage", message);
    setMessage("");
  };

  return (
    <div className="h-screen w-full bg-neutral-900">
      <Navbar />
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
          <div class="flex bg-cyan-500 rounded-full">
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
            <div className="flex justify-center mx-auto flex-col">
              <div className="text-2xl">
                <span className="text-gray-700 mr-3 uppercase font-bold">
                  {user && ` ${user.name}`}

                </span>
              </div>
            </div>
          </div>
          <div className="block overflow-y-scroll max-h-[29rem]">
            <br />
            {chat.map((c) => {
              return (
                <div className="relative w-full p-6 overflow-y-auto h-25">
                  <ul className="space-y-2">
                    <li className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <div className="grid grid-cols-4 gap-4">

                          <>{user && (<ChatLabel msg={c} userId={user._id} />)}</>

                          <div ref={mesageEndRef} />

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
              <div className="col-span-2">
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
              <div className="mr-10">
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
