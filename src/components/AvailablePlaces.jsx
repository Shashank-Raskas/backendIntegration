import { useState,useEffect } from 'react';
import Places from './Places.jsx';

const places = localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace }) {

const [availablePlaces, setAvailablePlaces] = useState([]); ///initial empty array cuz fetch takes time to load

  // fetch('http://localhost:3000/places').then((response) => {  //!it creates infinite loop as state updating retriggers a rerender
  //   return response.json()                                   //? use a useEffect to handle http requests
  // })
  // .then((resData) => {
  //   setAvailablePlaces(resData.places);
  // });

  // useEffect(() => {
  //   fetch('http://localhost:3000/places').then((response) => {
  //     return response.json()
  //   })                                     //!if you want it in async then here it is below
  //   .then((resData) => {
  //     setAvailablePlaces(resData.places);
  //   });
  // }, []); //? empty array as second argument to run only once when the component mounts

  useEffect(() => {
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
    }

    fetchPlaces(); //? call the function to fetch data
  }, []); //? empty array as second argument to run only once when the component mounts

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
