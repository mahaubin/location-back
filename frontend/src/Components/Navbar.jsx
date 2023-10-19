import { Link, useNavigate } from 'react-router-dom';
import '../Assets/css/Navbar.scss';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const Navbar = () => {
    const { loggedIn } = useContext(AuthContext);
    const redirect = useNavigate();
    const deconnexion = async () => {
        await axios({
          method: 'GET',
          url: `http://localhost:5000/api/auth/logout`,
        })
          .then((res) => {
              redirect('/');
              window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    return (
        // NAVBAR 
        <nav>
            <div className="innerNav">
                <div className="logo">
                    <b>Gestion Location</b>
                </div>
                <ul>
                    {loggedIn === false && (
                        <>
                            <li><Link to="/">Connexion</Link></li>
                            <li><Link to="/register">Inscription</Link></li>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <li><Link to="/bien">Mes biens</Link></li>
                            <li><Link to="/locataire">Mes Locataires</Link></li>
                        </>
                    )}
                    
                </ul>
                {loggedIn === true && (
                        <button onClick={deconnexion} className='logout'>Déconexion</button>
                    )}
               

                {/* Nav Mobile */}
                <div className="nav-mobile">
                    <span className="hideElement">
                        <a href="#header" className="active" style={{ '--i': '0.5s' }}>Accueil</a>
                    </span>
                    <span className="hideElement">
                        <a href="#problems" className="active" style={{ '--i': '0.6s' }}>Problemes</a>
                    </span>
                </div>
                {/* Burger Menu */}
                <button type="button" aria-label="burger Menu" className="toggle-nav">
                    <span className="line l1"></span>
                    <span className="line l2"></span>
                    <span className="line l3"></span>
                </button>
            </div>
        </nav>

    );
};

export default Navbar;