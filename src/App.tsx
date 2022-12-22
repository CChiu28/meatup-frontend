import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'

function App() {
  const [input,setInput] = useState({
    search: "",
    location: "",
  })

  function getSearch(search: string, location: string) {
    setInput({
      search: search,
      location: location
    });
  }

  return (
    <BrowserRouter>
      <Navbar onSearch={getSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={input}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
