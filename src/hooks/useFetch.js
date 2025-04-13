import { useEffect,useState } from "react";

function useFetch(fetchFn,initialValue) {   //?Custom hooks should start with "use" and should be in camelCase
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
          setIsLoading(true); //! set loading to true before fetching data
          try {
            const data = await fetchFn();
            setFetchedData(data);
    
          } catch (error) {
            setError({
              message: error.message || 'Failed to fetch data.',
            });
          }
          setIsLoading(false); //! set loading to false if error occurs
        }
    
        fetchData();
      }, [fetchFn]); //! fetch data when the component mounts or when fetchFn changes

      return {
        isLoading,
        error,
        fetchedData,
        setFetchedData
      }
}

export default useFetch;