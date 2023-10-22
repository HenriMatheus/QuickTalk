import "./App.css"
import logo from "./img/logo.png"
import Chat from "./components/Chat"
import RoomButtons from "./components/RoomButtons"
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:5000/");

export default function App() {
  return (
    <>
      <RoomButtons socket={socket}/>
      <img src={logo} className="logo"/>
      <Chat socket={socket}/>
    </>
  )
}