import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FellowDetails from './pages/FellowDetails';
import InstructorDetails from './components/InstructorsList';
import './App.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/fellows/:id" element={<FellowDetails />}></Route>
      <Route path="/instructors/:id" element={<InstructorDetails />}></Route>
    </Routes>
  )
}

export default App
