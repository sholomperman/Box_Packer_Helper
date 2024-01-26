import { useState, useEffect } from 'react';
import './App.css';
import Products from './routes/Products';
import Navigation from './routes/Navigation';
import { Routes, Route } from "react-router-dom";
import AddProducts from './routes/AddProducts';
import Search from './routes/Search';
import axios from 'axios';


function App() {
  //const url = 'http://100.93.162.81:8081/';
  const url = 'http://localhost:8081/'; 
  const [editable, setEditable] = useState(null); 
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url)
  .then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  }); 
}, [editable])
console.log(editable)
  
  return (
    <div className="App">
    <Routes>
      <Route 
      path='/'
      element={
        <Products 
        url={url}
        editable={editable}
        setEditable={setEditable}
        data={data}
        setData={setData}
        />
      }
      />
      <Route 
      path='/edit'
      element={<AddProducts url={url} />}
      />
      <Route 
      path='/search'
      element={<Search data={data}/>}
      />
      <Route 
      path='/*'
      element={<h1 style={{color: 'red', width: '100%', textAlign: 'center'}}>Route not found</h1>}
      />
    </Routes>
    <Navigation />
    {/* this is just a spacer like <br /> */}
    <div style={{height: 80}} />
    </div>
  );
}

export default App;
