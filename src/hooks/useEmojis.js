import {useState, useEffect} from 'react';
import axios from 'axios';

export default endPoint => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(endPoint);
      setData(res.data);
    } catch {
      setErr('Oops something went wrong');
    }
  };

  return {
    data,
    err,
  };
};
