import {React, useState} from 'react'
import axios from 'axios';
import './products.css';
import DeleteIcon from '@mui/icons-material/Delete';

const Db = ({url, data, editable, setEditable}) => {
  const [newData, setNewData] = useState({
    name: '',
    box: '',
    count_per_box: '',
    weight: '',
  })

  const handleChange = e => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }

  const handleEdit = (id, index) => {
    setEditable(id);
    setNewData({
      name: data[index].name,
      box: data[index].box,
      count_per_box: data[index].count_per_box,
      weight: data[index].weight,
    })
  };

  const handleSave = (id, updatedData) => {
    try {
      axios.put(`${url}edit/${id}`, updatedData)
      console.log('Data updated successfully:', updatedData);
      setEditable(null);
      alert('Data changed successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
  
    if (isConfirmed) {
      try {
        axios.delete(`${url}delete/${id}`)
          .then(() => {
            console.log('Data deleted successfully:', id);
            alert('Data deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
          setEditable(null);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    } else {
      console.log('Deletion canceled');
    }
  };

  return (
    <table>
    <caption>Box App</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Box</th>
        <th scope="col">Count per box</th>
        <th scope="col">Weight</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((item, index) => (
      <tr key={item.id}>
        <td data-label="Name">{editable === item.id ? <input name='name' onChange={handleChange} value={newData.name} /> : item.name}</td>
        <td data-label="Box">{editable === item.id ? <input name='box' onChange={handleChange} value={newData.box} /> : item.box}</td>
        <td data-label="Count per box">{editable === item.id ? <input name='count_per_box' type='number' onChange={handleChange} value={newData.count_per_box} /> : item.count_per_box}</td>
        <td data-label="Weight">{editable === item.id ? <input name='weight' onChange={handleChange} value={newData.weight ?? ""}  /> : item.weight ?? "Not Set"}</td>
        <td>
          {editable === item.id ? (
            <div className='edit-container'>
            <button onClick={() => handleSave(item.id, newData)}>Save</button>
            <DeleteIcon onClick={()=>handleDelete(item.id)} /> 
            </div>
          ) : (
            <button onClick={() => handleEdit(item.id, index)}>Edit</button>
          )}
        </td>
      </tr>
    ))}
    </tbody>
  </table>
  )
}

export default Db