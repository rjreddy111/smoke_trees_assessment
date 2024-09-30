
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import RegisterPage from "./components/RegisterPage"
import HomePage from './components/HomePage';


const App = ()=>
  <>
  
  <BrowserRouter>
    <Routes>
      <Route path = "/register" element= {<RegisterPage/>} /> 
      <Route path = "/" element = {<HomePage/>} />
    </Routes>
  </BrowserRouter>
  
  </>

export default App;
