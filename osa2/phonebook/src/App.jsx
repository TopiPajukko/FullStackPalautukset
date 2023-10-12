/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { useState } from 'react'

const Filter = ({value, handleChange}) => {
  return(
  <div>
  <p>Filter shown by: </p>
  <input value={value} onChange={handleChange}/>
  </div>
  )
}

const Form = ({onSubmit, nameValue, handleNameValue, nroValue, handleNroValue}) => {
  return(
<form onSubmit={onSubmit}>
        <div>
          <p>name: </p>
          <input value={nameValue} onChange={handleNameValue}/>
          <p>number: </p>
          <input value={nroValue} onChange={handleNroValue}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        
      </form>
  )
}

const Persons =({persons}) => {
  return(
    <div>
      {persons}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , nro: '040 0000001'},
    { name: 'Ada Lovelace', nro: '39-44-5323523' },
    { name: 'Dan Abramov', nro: '12-43-234345' },
    { name: 'Mary Poppendieck', nro: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [filterValue, setFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObj =[{
      name: newName,
      nro: newNro
    }]

    if(persons.find((elem) => elem.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObj))
    }
  }

  const handleNewName = (event) => { setNewName(event.target.value) }

  const handleNewNro = (event) => { setNewNro(event.target.value) }

  const handleNewFilter = (event) => { setFilterName(event.target.value) }

  const filteredPersons = persons.map(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase()))?
  persons.filter(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase())):persons

  const allPersons = filteredPersons.map(persons => {return <p key={persons.name}>{persons.name} {persons.nro}</p>})

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleChange={handleNewFilter}/>
      <Form onSubmit={addPerson} nameValue={newName} handleNameValue={handleNewName} nroValue={newNro} handleNroValue={handleNewNro}/>
      <h2>Numbers</h2>
      <Persons persons={allPersons}/>
    </div>
  )
}

export default App
