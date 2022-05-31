import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios'


function App(props) {

  const initInputs = { foodName: props.foodName || "", days: props.days || "" };
  const [inputs, setInputs] = useState(initInputs)

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)

  const [foodList, setFoodList] = useState([])
  const [newFoodName, setNewFoodName] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', { foodName: foodName, days: days })
  }

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id, newFoodName: newFoodName
    })
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  const handleSubmit = () => {
      props.submit(inputs, props.id)
      setInputs(initInputs)
  }

  return (
    <div className="App">
      <h1>MERN CRUD APP</h1>
      <form onSubmit={handleSubmit}>
      <label>Food Name:</label>
      <input type="text" onChange={(event) => {
        setFoodName(event.target.value)
      }}
      />

      <label>Days Since You Ate It:</label>
      <input type="number" onChange={(event) => {
        setDays(event.target.value)
      }}
      />
      <button onClick={addToList} >Add to List</button>
      </form>
      <h1> Food List</h1>
      {foodList.map((val, key) => {
        return (
          <form key={key} className="data-container" onSubmit={handleSubmit}>
          <h1>{val.foodName}</h1>
            <h1>{val.daysSinceIAte}</h1>
            <input type="text" placeholder="New Food Name..." onChange={(event) => {
              setNewFoodName(event.target.value)
            }}
            />
            <div className="button-container">
              <button onClick={() => updateFood(val._id) }>Update</button>
              <button onClick={() => deleteFood(val._id)}>Delete</button>
            </div>
        </form>
      )})}
    </div>
  );
}

export default App;
