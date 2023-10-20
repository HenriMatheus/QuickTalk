import "../App.css"

export default function Message({ arrayMessages, socket }) {
  function typeMessage(contentMessage) {
    switch (contentMessage.msgType) {
      case "message":
        return <p>{contentMessage.userName}: {contentMessage.msg}</p>
      case "image":
        return (
          <div>
            <p>{contentMessage.userName}:</p>
            <img src={contentMessage.msg} className="midia"/>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div> 
        )
      case "video":
        return (
          <div>
            <p>{contentMessage.userName}:</p>
            <video src={contentMessage.msg} controls className="midia"></video>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div>
        )
      case "audio":
        return (
          <div>
            <p>{contentMessage.userName}:</p>
            <audio src={contentMessage.msg} controls className="midia"></audio>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div>
        )
      default:
        return (
          <div>
            <p>{contentMessage.userName}:</p>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div>
        )
    }
  }

  return (
    <div>
      {
        arrayMessages.map((userMsg, index) => (
          <li key={index} className={userMsg.id == socket.id ? 'myMsg' : 'otherMsg'}>
            {typeMessage(userMsg)}
          </li>
        ))
      }
    </div>
  )
}