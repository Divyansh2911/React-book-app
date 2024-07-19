import React, { useContext, useEffect, useRef, useState } from 'react'
import { LoadScript, GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api'
// import { themeContext } from './ThemeContextProvider'
import { useNavigate } from 'react-router-dom'

import { themeContext } from '../components/ThemeContextProvider'
const libs = ['places']

export default function MapWindow(props) {
    const { user, userLocation } = useContext(themeContext)
    // console.log(props.sellerLocLat)
    // console.log(props.sellerLocLng)
    console.log(userLocation)
    // const { lat, lng } = props.sellerLoc;
   
   const lng = parseFloat(props.sellerLocLng);
   const lat = parseFloat(props.sellerLocLat);
    console.log(props.sellerLocLat)
    console.log(props.sellerLocLng )
    const [seller,setSeller] = useState({ lat:  lat, lng: lng})
    const [center, setCenter] = useState(seller)
    const [location, setLocation] = useState(center)
    const mapref = useRef(null)
    const placeref = useRef(null)
    const markerref = useRef(null)

    const onLoad = (map) => {
        mapref.current = map
    }
    const onMarkerLoad = (marker) => {
        markerref.current = marker
    }
    //   const onLoadPlaces=(place)=>{
    //     placeref.current=place
    //   }
    const onIdle = () => {
        //     setLocation({
        //       lat:mapref.current.center.lat()
        //       ,lng:mapref.current.center.lng()
        //   })
    }
    //   const onPlacesChange=()=>{
    //     const place = placeref.current.getPlaces()[0].geometry.location;
    //     console.log(place)
    //     setLocation({lat:place.lat(),lng:place.lng()})
    //     setCenter({lat:place.lat(),lng:place.lng()})
    //   }
    //   const onConfirm = async(e)=>{
    //     const places = placeref.current.getPlaces();

    //     setUserLocation({long:lng,lat:lat});
    //     // e.preventDefault();

    //     try {
    //       const { data } = await axios.put('/api/users/'+user.userId, {
    //         userName: user.userName,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         phone: user.phone,
    //         email: user.email,
    //         password: user.password,
    //         address: {lng:lng,lat:lat},

    //       })
    //       // console.log(data)

    //       localStorage.setItem('bookUser', JSON.stringify(data))
    //       alert("Address saved sucessfully")
    //     } catch (err) {
    //      console.log(err)
    //      alert("Address Not saved Please try again... ")
    //     }

    //     navigate('/viewer/user')

    //   }

    //   const getUserCurrentLocation=()=>{
    //     if(!navigator.geolocation){
    //       alert("Geolocation is not supported in your browser")
    //     }
    //     else{
    //       navigator.geolocation.getCurrentPosition((position)=>{
    //         setCenter({
    //           lat:position.coords.latitude,
    //           lng:position.coords.longitude
    //         })
    //         setLocation({
    //           lat:position.coords.latitude,
    //           lng:position.coords.longitude
    //         })
    //       })
    //     }
    //   }
    // console.log(userLocation)
    // console.log(location)
    // console.log(center)
    // console.log(placeref)
    // console.log(markerref)
    // console.log(mapref)
    useEffect(() => {
        // getUserCurrentLocation();
    }, [])
    return (
        <div className='full-map-container'>
            <LoadScript libraries={libs} googleMapsApiKey={`AIzaSyClPnefMSdhVErR1DjVY1CJXznuiscN2VQ`}>
                <GoogleMap
                    id='sample-map'
                    mapContainerStyle={{ height: "300px", width: "85%" }}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onIdle={onIdle}
                >
                    {/* <StandaloneSearchBox onLoad={onLoadPlaces} onPlacesChanged={onPlacesChange}>
            <div className='map-search-container'>
              <input type='text' placeholder={your}>
              </input>
              <button type='button' onClick={onConfirm} className='map-button'>Confirm</button>
            </div>
          </StandaloneSearchBox> */}
                    <Marker position={location} onLoad={onMarkerLoad}></Marker>
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
