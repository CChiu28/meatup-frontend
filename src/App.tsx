import { createContext, useEffect, useState } from 'react';
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
  userId: string,
  businessId: string | boolean,
  businessName: string,
  position: number[]
}
const test = {
  sidebarStatus: false,
  user: "",
  userId: "",
  businessId: "",
  businessName: "",
  position: [0],
}
const locationContext = {
  loc: "",
  setLocation: () => {}
}
export const SidebarContext = createContext<user>(test);
export const LocationContext = createContext<{ loc: string, setLocation: any}>(locationContext);
// export const chatContext = createContext({});

function App() {
  const [locationError,setLocationError] = useState(false);
  const [loc,setLocation] = useState('');
  const value = { loc, setLocation };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      test.position = [pos.coords.latitude,pos.coords.longitude];
    })
  },[])

  function setError(bool:boolean) {
    setLocationError(bool);
  }

  return (
    <SidebarContext.Provider value={test}>
      <LocationContext.Provider value={value}>
        <BrowserRouter>
          <Navbar locationError={locationError} setLocationError={setError} />
          <Routes>
            <Route path="/" element={<Home setError={setError} />}/>
            <Route path='/results/:search' element={<Results />} />
            <Route path='/results/:search/:id' element={<Business />} />
          </Routes>
        </BrowserRouter>
      </LocationContext.Provider>
    </SidebarContext.Provider>
  )
}

export default App
