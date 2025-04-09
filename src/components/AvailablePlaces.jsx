import { useState,useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

const places = localStorage.getItem('places');
export default function AvailablePlaces({ onSelectPlace }) {

const [isLoading, setIsLoading] = useState(true); //? to show loading text
const [availablePlaces, setAvailablePlaces] = useState([]); ///initial empty array cuz fetch takes time to load
const [error, setError] = useState(null); //? to show error text


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
      try{
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
  
        if (!response.ok) {
          //const error = new Error(resData.message || 'Could not fetch places.');
          throw new Error('Failed to fetch places.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false); //! set loading to false after data is fetched ,moved from bottom cuz it gets executed as soon as we get location
        }
        );

      } catch(error){
        setError({
          message: error.message || 'Could not fetch places please try again later.'  
        });
        setIsLoading(false); //! set loading to false if error occurs
      }
        

    }

    fetchPlaces(); //? call the function to fetch data
  }, []); //? empty array as second argument to run only once when the component mounts

  if (error) {
        return <ErrorPage title="An error occurred" message={error.message } />; //! error handling
  }
  
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
