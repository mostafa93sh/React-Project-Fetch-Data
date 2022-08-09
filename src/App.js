import { React, useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

const App = () => {
  const [term, setTerm] = useState("java");
  const [result, setResult] = useState([]);
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounce(term), 2000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debounce,
        },
      });
      setResult(respond.data.query.search);
    };

    if (debounce) {
      search();
    }
  }, [debounce]);

  // useEffect(() => {
  //   const search = async () => {
  //     const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         origin: "*",
  //         format: "json",
  //         srsearch: term,
  //       },
  //     });
  //     setResult(respond.data.query.search);
  //   };

  //   if (!result.length) {
  //     if (term) {
  //       search();
  //     }
  //   } else {
  //     const debounce = setTimeout(() => {
  //       if (term) {
  //         search();
  //       }
  //     }, 600);
  //     return () => {
  //       clearTimeout(debounce);
  //     };
  //   }
  // }, [term, result.length]);

  const fetchData = result.map((el) => {
    return (
      <tr key={el.pageid}>
        <td>1</td>
        <td>{el.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        </td>
      </tr>
    );
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label className='form-label'>Search</label>
            <input
              className='form-control'
              type='text'
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              value={term}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>First</th>
                <th scope='col'>Last</th>
                <th scope='col'>Handle</th>
              </tr>
            </thead>
            <tbody>{fetchData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
