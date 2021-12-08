
import { useEffect, useState } from "react";
import "./EachConver.css";
import ServiceMessages from '../../services/messages.service';

export default function EachConversation({ infoConver }) {
  
const serviceMessages = new ServiceMessages()

const [userProfile, setUserProfile] = useState(undefined)

//DESCOMENTAR

// useEffect(() => {
//     getUserProfile()

//   }, [])


// const getUserProfile = () => {
// let profile = infoConver.members.find((elm) => elm !== currentUser._id);
//     setUserProfile(profile)
// }



  const getLastMessage = (idConver) => {
    serviceMessages.getLastMessage(idConver)
      .then(response => response.data)
      .catch(err => console.log(err))

  }

  //pasarle como prop la idConver

  return (
    <>
    <div className="conversation">
      
      <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={"https://www.soyfutbol.com/__export/1611681055504/sites/debate/img/2021/01/26/ester_exposito_portada_crop1611681042130.jpg_1902800913.jpg"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
        </div>

      <div className="date">
       <div>
            <span className="conversationName">Ester, 25</span>
            <p className="message">Vente pa Alcalá que estoy sola</p>

        </div>

        <p>10 dic.</p>

      </div>

    </div>

    <hr></hr>
    </>

   
  );
}
