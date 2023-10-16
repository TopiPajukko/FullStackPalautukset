/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from 'react'
import personService from './services/persons'

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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNro, setNewNro] = useState('')
  const [filterValue, setFilterName] = useState('')
  
  useEffect(()=>{
  personService.getAll().then(response =>{setPersons(response.data)})
  })

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {
      personService.deletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj ={
      name: newName,
      number: newNro
    }

    if(persons.find((elem) => elem.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook. Want to replace old number?`)) {
        const updatedPerson = persons.find((elem) => elem.name === newName)
        personService.update(updatedPerson.id, personObj)
      }
    }
    else {
      personService.create(personObj).then(response => {console.log(response.data)})
    }
  }

  const handleNewName = (event) => { setNewName(event.target.value) }

  const handleNewNro = (event) => { setNewNro(event.target.value) }

  const handleNewFilter = (event) => { setFilterName(event.target.value) }

  const filteredPersons = persons.map(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase()))?
  persons.filter(elem => elem.name.toLowerCase().includes(filterValue.toLowerCase())):persons

  const allPersons = filteredPersons.map(person => {
    return(
    <div key={person.id}>
    <p> {person.name} {person.number}</p>
    <button type="button" onClick={() => deletePerson(person.id)}>Delete</button>
    </div>
   )}
  )

  return(
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