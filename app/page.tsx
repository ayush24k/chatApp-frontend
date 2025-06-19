'use client'
import { useSocket } from "@/context/SocketProvider";
import { useState } from "react";

export default function Home() {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('')
  return (
    <main className="bg-slate-900 h-screen w-screen text-white">
      <div className="flex justify-center py-24">
        <div>
          <div>
            <h1>All message will appear here</h1>
          </div>
          <div>
            <input onChange={(e) => { setMessage(e.target.value) }} placeholder="messages" className="bg-slate-100 text-black rounded p-1"></input>
            <button onClick={() => { sendMessage(message) }}>Send</button>
          </div>
          <div>
            {messages.map((message, i) => {
              return (
                <li key={i}>{message}</li>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
