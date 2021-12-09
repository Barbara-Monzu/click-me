import { useContext, useEffect, useState, useRef } from "react";
import Post from "../post/Post.js";
// import Share from "../share/Share";
import "./PrivateChat.css";
import io from 'socket.io-client'
import MessagesService from "../../services/messages.service";
import UserContext from '../../services/UserContext'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";


let socket;

export default function PrivateChat({ idConver }) {

const { loggedUser } = useContext(UserContext)
const messagesService = new MessagesService()

const matchProfile = idConver.members.filter(elm => elm !== loggedUser._id)

const [room, setRoom] = useState('')
const [messages, setMessages] = useState([])
const [message, setMessage] = useState('')

const updateMessages = (message) => setMessages([...messages, message.message])
// const setInitialMessages = () => setMessages(chat.messages.map(message => parseMessage(message, 'db')))



useEffect(() => {
//   getMyMessages()
  setSocketConfig()

}, [])


const setSocketConfig = () => {

  const username = loggedUser.username

    socket = io("//localhost:5005", {

      cors: {
        origin: "//localhost:3000",
        credentials: true
      }, transports: ['websocket']
    })

    const roomName = [matchProfile._id.split(""), loggedUser._id.split("")].sort().join("")
    setRoom(`${roomName}`)

    socket.emit('join', { username, room: room }, () => {
      setInitialMessages()
    })

    socket.emit("conectado", "online");

  }

  const setInitialMessages = () => setMessages(getMessages())

  const getMessages = () => {
          messagesService
          .getAllmyMessages(idConver)
          .then(allMyMessages => null)
          .catch(err => console.error(err))
  
  }
  
  //Envío mensajes y los recibo. ¿Porqué si pongo al revés estos dos funciones me da error? No lee el useEffect()

  useEffect(() => {
    socket.on("receiveMessages", message => {
      setMessages([...messages, message.message])
      
    })
    return () => {socket.off()}
  }, [messages])
  
  
  const sendMessage = (e) => {
      e.preventDefault()
  
      if (message !== "") {
        socket.emit("sendMessage", message)
        setMessage("")
      }


//qué va antes? Arriba le sigo que me resetee el mensaje a "", pero en esta linea de debajo le estoy diciendo que me coja ese mensaje,
// ¿Qué menaje me coge, el de arriba o el de abajo? El lleno o el vacío?


    const newMessage = {
      message: { text: message },
      sender: loggedUser._id,
      receiver: matchProfile._id
    }

    messagesService
      .createMessage(newMessage, idConver._id)
      .then(res => null)
      .catch(err => console.error(err))

  }


const divRef = useRef(null);

useEffect(() => {
    divRef.current.scrollIntoView({behavior: "smooth"})
    })


  return (
    <div className="privateChat">
        <div className="feed">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
          
                        <img
                            className="postProfileImg"
                            src={"https://www.soyfutbol.com/__export/1611681055504/sites/debate/img/2021/01/26/ester_exposito_portada_crop1611681042130.jpg_1902800913.jpg"
                            }
                            alt=""
                        />
                    
                        <span className="postUsername">Bárbara</span>
                        <span className="postDate">26 años</span>

                    </div>
                </div>

                <hr></hr>
                
            </div>
        
                <div className="feedWrapper">
                <div>
                    {messages.map((elm, i) => <Post key={i} message={elm} />)}
                    <div ref={divRef}></div>
                </div>
                        <form onSubmit={sendMessage}className="postBottom">         
                            <input value={message} onChange={e => setMessage(e.target.value)} type="area" className="writeMessage" placeholder="escribe un mensaje..." />
                                <button> ENVIAR</button>
                        </form>
                </div>
        </div>
        
    </div>
  );
}


