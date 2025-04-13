import { useRef, useState, useCallback } from 'react';
import useFetch from './hooks/useFetch.js';
import ErrorPage from './components/Error.jsx';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  // const [userPlaces, setUserPlaces] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); //? to show loading text
  // const [error, setError] = useState();
  const [errorUpdatingPlaces,setErrorUpdatingPlaces] = useState(); //! to show error text
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {isLoading,error,fetchedData:userPlaces,setFetchedData:setUserPlaces} = useFetch(fetchUserPlaces,[]);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]); //! update the user places in the server as state value doesnt ahve latest value
    } catch (error){
      setUserPlaces(userPlaces); //! revert the state to previous value if error occurs
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update the places',  
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try{
      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to delete the places',  
      });
    }

    setModalIsOpen(false);
  }, [userPlaces,setUserPlaces]);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }
  return (
    <>
    <Modal open={errorUpdatingPlaces} onClose={handleError}>
      {/*kicking error only if errorUpdatingPlaces is available */}
      {errorUpdatingPlaces && (
      <ErrorPage 
      title='An Error occured' 
      message={errorUpdatingPlaces.message}
      onConfirm={handleError}
      />
      )}
    </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <ErrorPage title="An error occurred" message={error.message} />}
        {!error && 
        (
          <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isLoading}
          loadingText="fetching your places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
