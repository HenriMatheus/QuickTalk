import "../App.css"
import Message from "./Message"
import enviar from "../img/enviar.png"
import addArquivo from "../img/addArquivo.png"
import { useState, useEffect } from "react"

let myRoom
let userName = ""
let verify = true

export default function Chat({ socket }) {
  const [message, newMessage] = useState("")
  const [messages, newMessages] = useState([])

  socket.on("my_room", (room, name, id) => {
    myRoom = room

    if (verify) {
      userName = name
    }

    verify = false
  })

  useEffect(() => {
    socket.on("recive_message", (userMsg) => {
      newMessages([...messages, userMsg])
    })
  }, [messages])

  function addFiles(event) {
    const newFile = event.target.files[0]
    const fileName = newFile.name
    const reader = new FileReader()
    
    if (newFile) {
      reader.readAsText(newFile)
    }

    reader.onload = () => {
      const fileType = newFile.type
      const urlFile = URL.createObjectURL(newFile)

      if (fileType.startsWith("image/")) {
        socket.emit("send_message", urlFile, myRoom, socket.id, "image", fileName, userName)
      } else if (fileType.startsWith("video/")) {
        socket.emit("send_message", urlFile, myRoom, socket.id, "video", fileName, userName)
      } else if (fileType.startsWith("audio/")) {
        socket.emit("send_message", urlFile, myRoom, socket.id, "audio", fileName, userName)
      } else {
        socket.emit("send_message", urlFile, myRoom, socket.id, "document", fileName, userName)
      }
    }
  }

  function sendMessage(event) {
    event.preventDefault()
    socket.emit("send_message", message, myRoom, socket.id, "message", "", userName)

    newMessage("")
  }

  return (
    <div className="chat">
      <ul>
        <Message arrayMessages={messages} socket={socket} />
      </ul>
      
      <input type="file" id="files" onChange={addFiles}/>
        
      <div className="chatButtons">
          <form onSubmit={sendMessage}>
            <button type="submit" className="msgButtons"><img src={enviar} className="imgButton"/></button>         

            <input 
              type="text" 
              placeholder="Escreva sua mensagem!"
              onChange={(event) => newMessage(event.target.value)}
              value={message}
              className="msgBox"
            />

            <button type="button" onClick={() => document.querySelector("#files").click()} className="msgButtons"><img src={addArquivo} className="imgButton"/></button>         
          </form>
        </div>
    </div>
  )
}