import { useState, useEffect } from 'react';
import { getData } from '../api';

const useGet = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getData(endpoint);
          setData(result);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [endpoint]);

    return { data, loading, error };
  };
  
  export default useGet;
