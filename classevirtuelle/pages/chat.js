import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/client";
import { loadUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function chat() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on("message", (data) => {
      setChat([...chat, data]);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);

    const msg = { userId: user._id, user: user.name, message: message };
    setChat([...chat, msg]);

    socket.emit("message", msg);
    setMessage("");
  };

  return (
    <div className="App">
      <div>{user && `Connecter : ${user.name}`}</div>
      <div className="block">
        <br />
        Message:
        {chat.map((c, index) => {
          return (
            <div
              key={index}
              className={c.userId == user._id ? "bg-blue-400" : "bg-green-400"}
            >
              {c.user} : <span>{c.message}</span>
            </div>
          );
        })}
        <br />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="  Tapez votre message ici.."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Envoye</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
