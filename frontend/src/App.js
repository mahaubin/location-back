import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Accueil} from './Pages/Accueil';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Bien from './Pages/Bien';
import BienModif from './Pages/BienModif';
import Locataire from './Pages/Locataire';
import LocataireModif from './Pages/LocataireModif';
import Quittance from './Quittance/Quittance';
import axios from 'axios';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import { Register } from './Pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
            <Route path="/quittance" element={<Quittance />}/>
            <Route path="/" element={loggedIn === false? <Accueil /> :<Dashboard />} />
            <Route path="/register" element={loggedIn === false? <Register /> :<Dashboard />} />
          
        {loggedIn === true && (
          <>
            <Route path="/dashboard" element={loggedIn === true?<Dashboard />:<Accueil />} />
            <Route path="/bien" element={loggedIn === true?<Bien />:<Accueil />} />
            <Route path="/locataire" element={loggedIn === true?<Locataire />:<Accueil />} />
            <Route path="/bien-modif/:id" element={loggedIn === true?<BienModif />:<Accueil />} />
            <Route path="/locataire-modif/:id" element={loggedIn === true?<LocataireModif />:<Accueil />} />
          </>
        )}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
