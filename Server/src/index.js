const express = require("express")
const app = express()
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const server = createServer(app)
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
})

let active_rooms = []
let myRoom

io.on("connection", (socket) => {
    function checkRooms() {
        for (let i = 0; i <= active_rooms.length; i++) {
            socket.leave(active_rooms[i])   
        }
    }

    function emptyRooms() {
        for (let i = 0; i < active_rooms.length; i++) {
            let clientsInRoom = io.sockets.adapter.rooms.get(active_rooms[i])
            let numClients = clientsInRoom ? clientsInRoom.size : 0
            
            if (numClients === 0) {
                active_rooms.includes(active_rooms[i]) ? active_rooms.splice(active_rooms.indexOf(active_rooms[i]), 1) : 0
                console.log(`A sala ${active_rooms[i]} esta vazia.`)
            }
        }
    }

    socket.emit("all_rooms", active_rooms)

    socket.on("create_new_room", (room, name) => {
        checkRooms()
        emptyRooms()

        try {
            myRoom = room
            socket.join(room)
            active_rooms.push(room)
        } catch(err) {
            console.error(`Erro: ${err}`)
        } 

        io.to(room).emit("my_room", myRoom, name)
        io.emit("all_rooms", active_rooms)  

        console.log(active_rooms)
    })

    socket.on("join_room", (room, name) => {
        checkRooms()

        io.emit("all_rooms", active_rooms)

        try {
            socket.join(room)
        } catch(err) {
            console.error(`Erro: ${err}`)
        } finally {
            io.to(room).emit("my_room", room, name)
        }
    })

    socket.on("send_message", (message, room, userId, type, FileName, name) => {
        io.to(room).emit("recive_message", {
            id: userId, 
            msg: message, 
            msgType: type, 
            fileName: FileName,
            userName: name
        })
    })
})

server.listen(5000,() => console.log("Servidor ligado!"))