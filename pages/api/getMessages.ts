// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'
import { Message } from '../../typings'

type Data = {
  messages: Message[]
}

type ErrorDate = {
    body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorDate>
) {

    if (req.method !== 'GET') {
        res.status(405).json({body:'Method not Alowed'})
        return
    }

    const messagesRes = await redis.hvals('messages')
    const messages: Message[] = 
        messagesRes.map((message)=>JSON.parse(message)).sort((a,b)=>b.created_at-a.created_at)

  res.status(200).json({ messages })
}
