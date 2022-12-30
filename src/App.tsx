import { createContext, useState } from 'react';
import reactLogo from './assets/react.svg';
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Results from './components/Results';
import Business from './components/Business';
import ChatSidebar from './components/ChatSidebar';

interface user {
  sidebarStatus: boolean,
  user: string | null,
  business: string | null
}
const test = {
  sidebarStatus: false,
  user: "",
  business: ""
}
export const SidebarContext = createContext<user>(test);

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
    <SidebarContext.Provider value={test}>
    <BrowserRouter>
      <Navbar />
      {/* <ChatSidebar showSidebar={side}/> */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/results' element={<Results />} />
        <Route path='/results/:id' element={<Business />} />
        {/* <Route path='/chat' element={<ChatSidebar />} /> */}
      </Routes>
    </BrowserRouter>
    </SidebarContext.Provider>
    // <>
    //   <Navbar onSearch={getSearch} />
    //   {(input.search!==""&&input.location!=="") ? <Results searchResults={input} /> : <Home />}
    // </>
  )
}

export default App
