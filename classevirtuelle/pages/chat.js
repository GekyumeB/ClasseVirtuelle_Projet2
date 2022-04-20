import React, { useState, useEffect } from "react";

import { getSession } from "next-auth/client";

import { io } from "socket.io-client";

export default function chat() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();

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
    props: {},
  };
}
