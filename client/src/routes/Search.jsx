// Search.js

import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';

const Search = ({ data }) => {
  const [result, setResult] = useState('');
  const [count, setCount] = useState(0)
  const [arrResult, setArrResult] = useState([]);

  function searchObjectsByName(inputValue, arrayOfObjects) {
    const filteredObjects = arrayOfObjects.filter(obj => obj.name.toLowerCase().includes(inputValue.toLowerCase().trim()));
    return filteredObjects;
  }

  const handelChange = e => {
    const inputValue = e.target.value;
    setResult(inputValue);
    const filteredObjects = searchObjectsByName(inputValue, data);
    setArrResult(filteredObjects);
    arrResult.length > 1 && setCount(0);
  };


  return (
    <>
      <OutlinedInput
        onChange={handelChange}
        value={result}
        fullWidth
        placeholder='Search'
      />
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Box</th>
            <th scope="col">Count per box</th>
            <th scope="col">Weight</th>
          </tr>
        </thead>
        <tbody>
          {arrResult?.map((item) => {
            const index = item.name.toLowerCase().indexOf(result.toLowerCase());
            const displayValue = index !== -1 ? (
              <>
                {item.name.slice(0, index)}
                <span style={{ color: 'red' }}>{result.toLocaleLowerCase()}</span>
                {item.name.slice(index + result.length)}
              </>
            ) : (
              item.name
            );
            return (
              <tr key={item.id}>
                <td data-label="Name">{displayValue}</td>
                <td data-label="Box">{item.box}</td>
                <td data-label="Count per box">{item.count_per_box}</td>
                <td data-label="Weight">{item.weight ?? "Not Set"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        arrResult.length === 1 && (
          <>
            <OutlinedInput
            onChange={(e)=>{
              setCount(e.target.value);
            }}
            fullWidth
            placeholder='Count'
            type='number'
            />
            <h3>{arrResult[0].box} Box needed: {Math.floor(count / arrResult[0].count_per_box) === 0 ? '>1' : Math.floor(count / arrResult[0].count_per_box)}</h3>
            <h3>Extra Items: {count % arrResult[0].count_per_box}</h3>
          </>
          )
        }
    </>
  );
};

export default Search;