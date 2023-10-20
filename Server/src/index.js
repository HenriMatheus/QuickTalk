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
    console.log("Novo usuario conectado: " + socket.id)
    socket.emit("all_rooms", active_rooms)

    socket.on("create_new_room", (room, name) => {
        try {
            myRoom = room

            socket.join(room)
            active_rooms.push(room)      
        } catch(err) {
            console.log(`Erro: ${err}`)
        } finally {
            io.to(room).emit("my_room", myRoom, name)
            socket.emit("all_rooms", active_rooms)
            
            console.log(`Nova sala criada: ${room}`)
            console.log(active_rooms)
        }
    })

    socket.on("join_room", (room, name) => {
        console.log(room)
        try {
            socket.join(room)
        } catch(err) {
            console.log(`Erro: ${err}`)
        } finally {
            io.to(room).emit("my_room", room, name)
            console.log(`Nova usuário na sala: ${room}`)
        }
    })

    socket.on("send_message", (message, room, userId, type, FileName, name) => {
        console.log(`Mensagem: ${message}\nSala: ${room}\nUsuário: ${userId}`)
        io.to(room).emit("recive_message", {
            id: userId, 
            msg: message, 
            msgType: type, 
            fileName: FileName,
            userName: name
        })
    })
})

server.listen(5000, () => {
    console.log("Servidor rodando em http:localhost:5000/")
})