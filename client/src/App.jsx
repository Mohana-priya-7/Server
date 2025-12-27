import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />          // Root path now shows Signup
        <Route path="/register" element={<Signup />} />  // Alternate signup route
        <Route path="/login" element={<Login />} />      // Login route
        <Route path="*" element={<Signup />} />          // Fallback route
      </Routes>
    </BrowserRouter>
  );
}
export default App;