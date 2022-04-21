import {io} from 'socket.io-client'
import React, { useState, useEffect} from 'react';

const socket = new io("localhost:8080")
// ceci est un example de comment faire le user
const userName = 'User ' +  parseInt(Math.random()*10);

function Home() {
  //Page principale.
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() =>{
    socket.on('message', data => {
      setChat([...chat, data])
    })
  })
  
  const envoiMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message',{userName, message})
    setMessage('')
  }
  socket.on('connection', () =>{
    console.log('connexion au serveur...');
  })

  return (
    <div>
     
      {/*BODY*/}
      <div className="bg-gg h-screen ">
        <p className="text-blue-400 opacity: 1 font-logo pt-6 text-3xl md:text-3xl lg:text-5xl text-md text-center ">
          Classe Virtuelle
          <div> test
            <br/>
            Message:

            {chat.map((data, index) => {
              return(
                <h3 key={index}>{data.userName}: <span>{data.message}</span></h3>
              )
            })} 
            <br/>
            <form on onSubmit={envoiMessage}>
              <input type = "text" className="message" placeholder='ecrire votre message ici..'
                onChange={(e) => {setMessage(e.target.value)}} required></input>
              <button type='submit'>Envoyer</button>
            </form>
                               
          </div>
        </p>
        <p className="text-blue-400 opacity: 1 font-text pt-6 text-xl md:text-2xl lg:text-4xl  text-center">
          Un systeme de messagerie fait uniquement pour l'école.
        </p>
      </div>
    </div>
  );
}

export default Home;
