import "./App.css"
import Chat from "./components/Chat"
import RoomButtons from "./components/RoomButtons"
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:5000/");

export default function App() {
  return (
    <main className="screen">
      <RoomButtons socket={socket}/>
      <Chat socket={socket}/>
    </main>
  )
}