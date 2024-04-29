import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthLayout from './components/Layouts/AuthLayout';
import AppLayout from './components/Layouts/AppLayout';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
