import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/client";
import { loadUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import { io } from "socket.io-client";

export default function chat({ session }) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();

  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    setSocket(io());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", { message });
    setMessage("");
  };

  return (
    <div className="App">
      <div>{user && `Connecter : ${user.name}`}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Type message"
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
    props: {
      session,
    },
  };
}
