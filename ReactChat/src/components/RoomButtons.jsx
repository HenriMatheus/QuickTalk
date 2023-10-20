import "../App.css"

let max_rooms = 10
let all_rooms = []

export default function RoomButtons({ socket }) { 
    socket.on("all_rooms", (active_rooms) => all_rooms = active_rooms)

    function newRoom() {
        let cod_room = Math.floor(Math.random() * max_rooms)
        let userName = document.getElementById("userName").value

        if (all_rooms.length < max_rooms) {
            while (all_rooms.includes(cod_room)) {
                cod_room = Math.floor(Math.random() * max_rooms)
            }

            socket.emit("create_new_room", cod_room, userName)
        } else {
            console.log("Número máximo de salas atingido!")
        }
    }

    function join_into_room() {
        let cod_room = Number(document.getElementById("code").value)
        let userName = document.getElementById("userName").value
        all_rooms.includes(cod_room) ? socket.emit("join_room", cod_room, userName) : alert("Sala inexistente")
    }

    return (
        <div className="button_rooms">
            <input type="text" placeholder="Nome" id="userName" className="inputRooms"/>
            <button onClick={newRoom} className="inputRooms">Criar sala</button>
            <input type="number" placeholder="Número da sala" id="code" className="inputRooms"/>
            <button onClick={join_into_room} className="inputRooms">Entrar</button>
        </div>
    )
}