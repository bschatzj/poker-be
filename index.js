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
let bet = 0
let action = 1

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    if (ids.includes(socket.id)) {
      
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

          io.to(socket.id).emit('registered', { id: socket.id, player: 2, name: name, room: waiting })
          io.sockets.in(waiting).emit('ready')
        }
      }
    }
  });    


  socket.on('shuffle', () => {
    deck = Shuffler()
  })

  socket.on("deal", (room) => {
    const inRoom = users.filter((user) => user.room == room.name)
    
    io.sockets.in(room.name).emit('hands', { response: { payer1: { "cardOne": deck.pop(), "cardTwo": deck.pop() } }, response2: { hand2: { "cardOne": deck.pop(), "cardTwo": deck.pop() } } })
  }) 
 
  socket.on("bet", ({player, ammount, table}) => {
    //console.log('betstuff', player, ammount, table )
    bet = ammount
    io.sockets.in(table).emit('bet', {player, ammount})
    io.sockets.in(table).emit('call', ammount)
  })
   
  socket.on("check", (table, player) => {
    io.sockets.in(table).emit('check', player)
  }) 
 
  socket.on("fold", (table, player) => {
    io.sockets.in(table).emit('fold', player)
  }) 
 
  socket.on('flop', (table) => {
    io.sockets.in(table).emit('flop', [deck.pop(), deck.pop(), deck.pop()])
  })
   
  socket.on('turn', (table) => {
    io.sockets.in(table).emit('turn', [deck.pop()])
  })
   
  socket.on('river', (table) => {
    io.sockets.in(table).emit('river', [deck.pop()])
  })
   
  socket.on('judge', (table)=>{
  
    io.sockets.in(table).emit('judge')
  })

  socket.on('winner', (table) => {
    
    io.sockets.in(table.table).emit('winner', table.winner)
  })
 
 
  socket.on('call', (table, player, size) => {
    
    io.sockets.in(table).emit('called', {player, size})
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

        