'use client'

import { FormEvent, useState } from "react"
import useSWR from "swr"
import {v4 as uuid} from 'uuid'
import { Message } from "../typings"
import fetcher from "../utils/fetchMessages"

function ChatInput() {
    const [input,setInput] = useState("")
    const {data, error, mutate} = useSWR("/api/getMessages", fetcher)


    const addMessage = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!input) return;

        const messageToSend = input;

        setInput('')

        const id = uuid()

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'Arash Hosseini',
            profilePic:'https://yt3.ggpht.com/yti/AHXOFjWcc7SMLf3HowFwODeHebvZLoF3H9jLTH8UXd4b-Q=s88-c-k-c0x00ffffff-no-rj-mo',
            email:'work.arashhosseini@gmail.com'
        }


        const uploadMessageToUpstash = async () => {
            const res = await fetch('/api/addMessage',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    message,
                }),
            });

            const data = await res.json()
            console.log('message added',data)
        };

        uploadMessageToUpstash()
    }

  return (
    <form onSubmit={addMessage}
    className='flex px-10 py-5 space-x-2 border-t border-gray-100 fixed z-50 bottom-0 w-full'>
    <input
    value={input}
    onChange={(e)=>setInput(e.target.value)}
     type="text" placeholder='Enter Message here...' className='flex-1 rounded border border-gray-300 focus:outline-none
    focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed' />
    <button
    disabled={!input}
     type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'>
        Send
    </button>
    </form>
  )
}

export default ChatInput