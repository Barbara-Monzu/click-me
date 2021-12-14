import { useContext, useEffect, useState } from "react";
import "./UserProfile.css"
import DatesService from "../../services/dates.service";
import UserContext from '../../services/UserContext'
import { Link, useHistory } from 'react-router-dom'
import EditDate from '../editDate/EditDate'
import { Modal, Button } from 'react-bootstrap'



const datesService = new DatesService()

const UserProfile = () => {

  const { loggedUser } = useContext(UserContext)
  const [dates, setMydates] = useState([])
  const [dateSelected, setDateSelected] = useState(undefined)
  const [modal, setModal] = useState(false)
  const [modaltwo, setModaltwo] = useState(false)

  useEffect(() => {
    showDates()
  }, [modal])

  const showDates = () => {
    datesService.getOwnDates(loggedUser._id)
      .then(response => {
        setMydates(response.data)
        console.log("estoy mirando mis citas en mi perfil ==>", response.data)
      })
      .catch(err => console.log("hay un error al conseguir las citas del otro en el front", err))
  }

  
  const editDate = (date) => {
    setModal(true)
    setDateSelected(date)
  }
  
  const deleteDate = (id) => {
    datesService.deleteDate(id)
    .then(response => {
      console.log("ELIMINANDO CON ÉXITO ==>", response.data)
    })
    .catch(err => console.log("hay un error al conseguir las citas del otro en el front", err))
  }

  const closeModal = () => {
    setModal(false)
  }

  const closeModaltwo = () => {
    setModal(false)
  }



  return (
    <>
      <div className="card-pic-container">
        <img className="card-pic" src={loggedUser.profileImages[0]} />

        <div className="all-card-info">
          <div className="card-info">
            <p className="card-name">{loggedUser.username}</p>
            <p className="card-age">{loggedUser.age}</p>
          </div>
          <p className="card-bio">{loggedUser.bio}</p>
        </div>
        {/* <p className="card-bio">Lo que sea</p> */}

        <div className="box-content">
          <p className="card-date-title">Mis citas</p>
          <Link className="userProfile-link" to="/editar-perfil">
            Editar perfil
          </Link>
        </div>
        <button onClick={() => setModal(true)}>Crea una cita</button>

        <div className="date">
          {dates?.map((elm, i) =>

            <div key={i}>
              <div className="userProfile-date-detail">
                <p className="userProfile-date-name">{elm.nameDate}</p>
                <p className="date-description">{elm.description}</p>
                <p className="date-category">{elm.category}</p>
                <button onClick={() => editDate(elm)} className="userProfile-date-button">Editar </button>
                <button onClick={() => deleteDate(elm._id)} className="userProfile-date-button">Borrar </button>
              </div>
            </div>
          )}
        </div>

        <Modal
          show={modal}
          backdrop="static"
          onHide={closeModal}>

          <Modal.Header closeButton>
            <Modal.Title>Edita tu cita</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <EditDate dateSelected={dateSelected} closeModal={closeModal} />
          </Modal.Body>
        </Modal>

        <Modal
          show={modaltwo}
          backdrop="static"
          onHide={closeModaltwo}
        >
          <Modal.Header closeButton>
            <Modal.Title>Crea una cita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditDate closeModal={closeModal} />
          </Modal.Body>
        </Modal>



      </div>


    </>

  )
}

export default UserProfile