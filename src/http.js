export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        //const error = new Error(resData.message || 'Could not fetch places.');
        throw new Error('Failed to fetch places.');
    }
    return resData.places;
}

export async function updateUserPlaces(places){
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places: places }), //? send the data as json
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Failed to update user places.');
    }
    return resData.message;
}