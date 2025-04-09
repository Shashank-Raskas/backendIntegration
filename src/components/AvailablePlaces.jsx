import { useState,useEffect } from 'react';
import Places from './Places.jsx';

const places = localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace }) {

const [isLoading, setIsLoading] = useState(true); //? to show loading text
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
      setIsLoading(true); //! set loading to true before fetching data
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsLoading(false); //! set loading to false after data is fetched
    }

    fetchPlaces(); //? call the function to fetch data
  }, []); //? empty array as second argument to run only once when the component mounts

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
