import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';

function App() {
return ( <BrowserRouter>
 <Routes>
<Route path="/" element={<Navigate to="/register" replace />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/NewPassword" element={<NewPassword />} />
</Routes> 
</BrowserRouter>
);
}

export default App;
