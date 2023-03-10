'use client'

import { FormEvent, useState } from "react"
import useSWR from "swr"
import {v4 as uuid} from 'uuid'
import { Message } from "../typings"
import fetcher from "../utils/fetchMessages"

function ChatInput() {
    const [input,setInput] = useState("")
    const {data:messages, error, mutate} = useSWR("/api/getMessages", fetcher)
    console.log(messages)

    const addMessage = async (e : FormEvent<HTMLFormElement>) => {
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
            profilePic:'https://lh3.googleusercontent.com/a/AEdFTp4vu1jsRscd02FJWZBFwHMqzyi3PxuAOWZ2abUJKg=s317-p-rw-no',
            email:'work.arashhosseini@gmail.com'
        }


        const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage',{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    message,
                }),
            }).then(res=>res.json())

            return [data.message, ...messages!]
        };

        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true,
        })
    }

  return (
    <form onSubmit={addMessage}
    className='flex px-10 py-5 space-x-2 border-t border-gray-100 fixed z-50 bottom-0 w-full bg-white'>
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