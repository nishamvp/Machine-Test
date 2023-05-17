import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import LoginSignup from './LoginSignup/LoginSignup';
import Dashboard from './Dashboard/dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' Component={Dashboard}></Route>
        </Route>
        <Route path='/login' Component={LoginSignup}></Route>
      </Routes>
    </Router>
  );
}

export default App;
