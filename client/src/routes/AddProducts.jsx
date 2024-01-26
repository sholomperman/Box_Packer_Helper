import {React, useState} from 'react';
import axios from 'axios';
import './products.css';
import { useNavigate } from "react-router-dom";

const AddProducts = ({url}) => {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        name: '',
        box: '',
        count_per_box: '',
        weight: '',
      })

    const handleSaveNew = (data) => {
        try {
          axios.post(`${url}products`, data)
          console.log('Data added successfully:', data);
          alert('Data added successfully');
          navigate('/')
        } catch (error) {
          console.error('Error adding data:', error);
        }
      };

      const handleChangeNewProduct = e => {
        setNewProduct({
          ...newProduct,
          [e.target.name]: e.target.value
        })
      }
      
  return (
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
          <tr>
            <td data-label="Name"><input name='name' placeholder='Name' onChange={handleChangeNewProduct} value={newProduct.name} /></td>
            <td data-label="Box"><input name='box' placeholder='Box' onChange={handleChangeNewProduct} value={newProduct.box} /></td>
            <td data-label="Count per box"><input name='count_per_box' placeholder='Count per box' type='number' onChange={handleChangeNewProduct} value={newProduct.count_per_box} /></td>
            <td data-label="Weight"><input name='weight' placeholder='Weight' onChange={handleChangeNewProduct} value={newProduct.weight} /></td>
            <td><button onClick={() => handleSaveNew(newProduct)}>Save</button></td>
          </tr>
        </tbody>
    </table>
  )
}

export default AddProducts