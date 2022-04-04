import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  //Page contenat les informations de contactes.
  return (
    <div>
      <head>
        <title>Classe Virtuelle</title>
      </head>
      {/*BODY*/}
      <div className="bg-gg h-screen ">
        <p className="text-blue-400 opacity: 1 font-logo pt-6 text-3xl md:text-3xl lg:text-5xl text-md text-center ">
          Classe Virtuelle
        </p>
      </div>
    </div>
  );
}

export default Home;
