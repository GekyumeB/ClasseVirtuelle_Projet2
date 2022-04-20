import React from "react";

import { getSession } from "next-auth/client";

function chat() {
  return <div>Mon Super Chat!!!!</div>;
}

export default chat;

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
