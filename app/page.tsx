import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'

async function HomePage() {
  const data = await fetch(`${process.env.VRECEL_URL || "http://localhost:3000"}/api/getMessages`).then((res)=>res.json())

  const messages: Message[] = data.messages;

  return (
    <main>
        <MessageList initialMesseges={messages} />
        <ChatInput />
    </main>
  )
}

export default HomePage