'use client'

import React from 'react'
import useSWR from "swr"
import { Message } from '../typings'
import fetcher from "../utils/fetchMessages"


function MessageList() {
    const { 
        data : messages,
        error, 
        mutate
    } = useSWR<Message[]>("/api/getMessages", fetcher);

    console.log(messages)

  return (
    <div>
        {messages?.map((message)=>(
            <div key={message.id}>
                <p>{message.message}</p>
            </div>
        ))}
    </div>
  )
}

export default MessageList