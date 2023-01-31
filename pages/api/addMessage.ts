// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'
import { Message } from '../../typings'

type Data = {
  message: Message
}

type ErrorDate = {
    body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorDate>
) {

    if (req.method !== 'POST') {
        res.status(405).json({body:'Method not Alowed'})
        return
    }

    const {message} = req.body;

   const newMessage = {
    ...message,
    //Replace the timestamp of the user to the timestamp of the server
    created_at:Date.now(),
   }

   //push  to upstassh redis db
   await redis.hset('messages', message.id,JSON.stringify( newMessage ))

  res.status(200).json({ message: newMessage })
}
