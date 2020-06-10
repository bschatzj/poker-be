const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json())
app.use(router)




let deck = Shuffler()
let users = []
let ids = []
let waiting = ""
let number = 0

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    if (ids.includes(socket.id)) {
      console.log(socket.id)
      io.to(socket.id).emit('err', "you're already in a game")
    }
    else { 
      if (room === "random") {
        if(number === 0) {
          number = 1
          waiting = name
          room = name
          const inRoom = users.filter((user) => user.room == room.name)
          users.push({ "id": socket.id, name, "room": name })
          io.to(socket.id).emit('registered', { inRoom, id: socket.id, player: 1, name: name, room: name})
          socket.join(room)
          ids.push(socket.id)
        }
        else { 
          number = 0
          socket.join(waiting)
          users.push({ "id": socket.id, name, "room": waiting })
          ids.push(socket.id)
          const inRoom = users.filter((user) => user.room == room.name)
          console.log("inRoom", inRoom)
          io.to(socket.id).emit('registered', { id: socket.id, player: 2, name: name, room: waiting })
        }
      }
    }
  });


  socket.on('shuffle', () => {
    deck = Shuffler()
  })

  socket.on("deal", (room) => {
    const inRoom = users.filter((user) => user.room == room.name)
    console.log("theroom", room)
    io.sockets.in(room.name).emit('hands', { response: { payer1: { "cardOne": deck.pop(), "cardTwo": deck.pop() } }, response2: { hand2: { "cardOne": deck.pop(), "cardTwo": deck.pop() } } })
  })
 
    
  














  
});





function Shuffler() {
  const Deck = []
  const suits = ['d', 'c', 'h', 's']
  const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']

  for (let suit in suits) {
    for (let value in values) {
      Deck.push({ card: `${values[value]}${suits[suit]}` })
    }
  }

  const shuffle = () => {
    let m = Deck.length

    while (m) {
      const i = Math.floor(Math.random() * m--);

      [Deck[m], Deck[i]] = [Deck[i], Deck[m]]
    }
  }
  shuffle()
  return Deck
}

server.listen(process.env.PORT || 8080, () => console.log(`Server has started.`));

