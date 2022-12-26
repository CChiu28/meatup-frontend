import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Results from './components/Results'

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/results' element={<Results />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   <Navbar onSearch={getSearch} />
    //   {(input.search!==""&&input.location!=="") ? <Results searchResults={input} /> : <Home />}
    // </>
  )
}

export default App
