
import React from 'react';
import Main from './Components/Main';
import './Components/style.css'
import {useEffect, useState} from "react"
import axios from "axios"



function App() {
const [nameList, setNameList] = useState([])
const [search, setSearch] = useState("")



useEffect(()=> {
  axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
  .then((response)=>{setNameList(response.data.results)})
},[])

  return (
    <>
    <Main/>
    </>
  )
}

export default App;
