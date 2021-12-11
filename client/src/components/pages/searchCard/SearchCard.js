import React from 'react'
import './SearchCard.css'
import HeaderNav from '../headerNav/HeaderNav'
import FooterNav from '../footerNav/FooterNav'
// import DatesService from "../../../services/dates.service"

const SearchCard = (props) => {
    
// const datesService = new DatesService()
// const dates = []
// let filteredDate = []


// getDates()
// filterByDate()

// const getDates = () => {
//     datesService.getAllDates()
//       .then(response => {
//         console.log("estoy mirando todas las citas ==>", response.data)
//         dates = [...response.data] 
//       })
//       .catch(err => console.log("hay un error al conseguir las citas en el SearchBar", err))
//   }


// const filterByDate = () => {
//       for(let i = 0; i <= props.users.length; i++) {
//           let [ one ]= dates.filter( elm => elm.creator === props.users[i]._id )
//            filteredDate.push(one)
//       }

//     }

    return (
        <>
        
       <h1 className="search-h1">CLICK-ME</h1>
        <div className="search-container">
            <div className="search-box">
                <a href="#">
                    <div className="search-card one">
                        <p className="search-title">Compartamos el <br /> brunch </p>
                        <p className="search-subtitle">¿Con quién compartirías tu brunch?</p>
                        <p className="search-interest">Intereses</p>
                    </div> 
                </a>

                <a href="#">
                    <div className="search-card three">
                    <p className="search-title">Atrévete a compartir el arte</p>
                    <p className="search-subtitle">Encuentra con quien vivir el arte</p>
                    <p className="search-interest">Intereses</p>
                    </div>
                </a>

            </div>


            <div className="search-box">
                <a href="#">
                    <div className="search-card two">
                        <p className="search-title">Aventúrate</p>
                        <p className="search-subtitle">Amantes de la naturaleza</p>
                        <p className="search-interest">Intereses</p>
                    </div>
                </a>

                <a href="#">
                    <div className="search-card four">
                        <p className="search-title">¿Libre esta <br /> noche?</p>
                        <p className="search-subtitle">Un plan aleatorio nunca está de más</p>
                        <p className="search-interest">Intereses</p>
                    </div>
                </a>
            </div>
        </div>
        <div className="search-navbar">
            <p className="search-navbar-title">Buscar</p>
        <input className="search-input" type="text" />
        </div>
      
        </>
    )
}

export default SearchCard