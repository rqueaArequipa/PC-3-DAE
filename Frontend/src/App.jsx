import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Parentesco from './pages/apoderados/Parentesco';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Empleado from './pages/empleados/Empleado';
import Vehiculos from './pages/empleados/Vehiculos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/parentesco" element={<Parentesco/>}/>
        <Route path="/empleados" element={<Empleado/>}/>
        <Route path="/vehiculos" element={<Vehiculos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;