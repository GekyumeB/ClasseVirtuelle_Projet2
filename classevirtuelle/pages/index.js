function Home() {
  //Page principale.
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
        <p className="text-blue-400 opacity: 1 font-text pt-6 text-xl md:text-2xl lg:text-4xl  text-center">
          Un systeme de messagerie fait uniquement pour l'école.
        </p>
      </div>
    </div>
  );
}

export default Home;
