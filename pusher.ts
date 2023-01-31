import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: "1546351",
    key: "a19f472be7516c21ba11",
    secret: "bf8817b8ea52e659d145",
    cluster: "ap2",
    useTLS: true
})

export const clientPusher = new ClientPusher('a19f472be7516c21ba11', {
    cluster: 'ap2',
    forceTLS: true
  })