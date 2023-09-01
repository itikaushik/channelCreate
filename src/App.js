import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
