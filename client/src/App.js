import React, {useEffect, useState} from "react";
import axios from 'axios'

function App() {
  const [file, setFile] = useState([]);
  const [result, setResult] = useState(null);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "image/jpeg");

  useEffect(()=>{
    setResult(null)
  },[file])

  const sendHandle = (e) => {
    e.preventDefault();

    fetch('http://localhost:5050/upload', {
      method: 'POST',
      headers: myHeaders,
      body: file
    })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setResult(data)
        })
        .catch(err => {
          console.log(err)
          setResult(err)
        });
  }

  return (
    <div className="App">
      <h1>Result: {result}</h1>
      <form encType="multipart/form-data">
        <input onChange={event => setFile(event.target.files[0])} type="file"/>
        <input onClick={event => sendHandle(event)} type="submit" value='Send'/>
      </form>
    </div>
  );
}

export default App;

