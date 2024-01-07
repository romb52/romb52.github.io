import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header/Header';
import Home from '../home/Home';
import { AuthProvider } from '../../share/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;