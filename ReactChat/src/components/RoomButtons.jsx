import "../App.css"
import { useState } from "react"

let max_rooms = 1000
let all_rooms = []

export default function RoomButtons({ socket }) {
    const [roomIndicator, setRoomIndicator] = useState(Number)

    socket.on("all_rooms", (active_rooms) => all_rooms = active_rooms)

    function verifyUser(user) {
        if (user.trim().length === 0) {
            alert("Preencha todos os dados corretamente!")
        }
    }

    function addRoomIndicator(num) {
        setRoomIndicator(num)
    }

    function newRoom() {
        let cod_room = Math.floor(Math.random() * max_rooms) + 1
        let userName = document.getElementById("userName").value
        
        verifyUser(userName)

        if (all_rooms.length < max_rooms) {
            while (all_rooms.includes(cod_room)) {
                cod_room = Math.floor(Math.random() * max_rooms) + 1
            }

            socket.emit("create_new_room", cod_room, userName)
            addRoomIndicator(cod_room)
        } else {
            console.log("Número máximo de salas atingido!")
        }
    }

    function join_into_room() {
        let cod_room = Number(document.getElementById("code").value)
        let userName = document.getElementById("userName").value

        verifyUser(userName)

        if (all_rooms.includes(cod_room)) {
            socket.emit("join_room", cod_room, userName)
            addRoomIndicator(cod_room)
         } else {
            alert("Sala inexistente")
         } 
    }

    return (
        <div className="button_rooms">
            <input type="text" placeholder="Nome" id="userName" className="inputRooms"/>
            <button onClick={newRoom} className="inputRooms">Criar sala</button>
            
            <input type="number" placeholder="Número da sala" id="code" className="inputRooms"/>
            <button onClick={join_into_room} className="inputRooms">Entrar</button>
            
            <p className="roomIndicator">Número da sala:<br></br>{roomIndicator > 0? roomIndicator : ""}</p>
        </div>
    )
}