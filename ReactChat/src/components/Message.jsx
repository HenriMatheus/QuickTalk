import "../App.css"

export default function Message({ arrayMessages, socket }) {
  let changeStyle = true

  function typeMessage(contentMessage) {

    switch (contentMessage.msgType) {
      case "message":
        return (
          <div>
            <b>{contentMessage.userName}</b><br></br>
            {contentMessage.msg}
          </div>
        )
      case "image":
        return (
          <div>
            <p><b>{contentMessage.userName}</b></p>
            <img src={contentMessage.msg} className="midia"/>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div> 
        )
      case "video":
        return (
          <div>
            <p><b>{contentMessage.userName}</b></p>
            <video src={contentMessage.msg} controls className="midia"></video>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div>
        )
      case "audio":
        return (
          <div>
            <p><b>{contentMessage.userName}</b></p>
            <audio src={contentMessage.msg} controls className="midia"></audio>
            <a href={contentMessage.msg} download={contentMessage.fileName}>⬇</a>
          </div>
        )
      default:
        return (
          <div>
            <p><b>{contentMessage.userName}</b></p>
            <a href={contentMessage.msg} download={contentMessage.fileName} className="doc">⬇| {contentMessage.fileName} |⬇</a>
          </div>
        )
    }
  }

  return (
    <>
      {
        arrayMessages.map((userMsg, index) => {
          const tempChangeStyle = changeStyle
          changeStyle = !tempChangeStyle

          return (
            <li key={index} className={tempChangeStyle ? 'myMsg' : 'otherMsg'}>
              {typeMessage(userMsg)}
            </li>
          )
        })
      }
      <br></br>
    </>
  )
}
