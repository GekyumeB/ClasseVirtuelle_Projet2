import React from 'react'
import convertTime from '../utils/convertTime'

function ChatLabel({ msg, userId }) {
  return (
    <div className="flex">
      {
        msg.userId !== userId ? (
          <div className="relative my-auto mr-4">
            <span className="absolute w-max text-green-500">
              <svg className="w-3 h-3">
                <circle cx="4" cy="4" r="4" fill="currentColor"></circle>
              </svg>
            </span>
            <figure className="w-8 h-8 rounded-full">
              <img
                src={msg.avatarUrl}
                className="rounded-full "
              />
            </figure>
          </div>
        ) : (
          <></>
        )
      }
      <div className={`block w-max rounded-[2rem] ${msg.userId !== userId ? 'bg-blue-100' : 'bg-green-100'}`}>
        <div className="flex">
          <p className="pl-5 font-semibold uppercase">{msg.username}</p> <p className="pl-52 text-xs my-auto">{convertTime(msg.time)}</p>
        </div>
        <div className='w-[500px] pl-8 font-serif'>
          <p className="truncate whitespace-nowrap overflow-hidden">
            {msg.text}
          </p>
        </div>


      </div>
    </div>
  )
}

export default ChatLabel
