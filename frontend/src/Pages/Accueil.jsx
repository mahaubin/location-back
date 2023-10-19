import React,{useContext,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Accueil = () => {
    const { getLoggedIn } = useContext(AuthContext);
    const redirect = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
           const connected= await axios({
                method: 'POST',
                url: `http://localhost:5000/api/auth/login`,
                data: {
                    email: email,  
                    password: password,
                },
              });
          if(connected.status === 200){
            await getLoggedIn();
            toast.success('Inscription avec succèss', {
              position: toast.POSITION.TOP_RIGHT
          });
          console.log(connected.data)
            redirect('/dashboard');
          }
        } catch (error) {
          toast.error('Il y a une erreur', {
            position: toast.POSITION.TOP_RIGHT
        });
            console.log(error)
        }
    }
  return (
    <div className='container'>
    <div className="form-structor">
        <div className="signup">
                <h2 className="form-title" id="signup">Connexion</h2>
                <div className="form-holder">
                <input type="email" 
                            className="input" 
                            placeholder="Email" 
                            name="email" 
                            onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            value={email} 
                        />
                        <input type="password" 
                            className="input" 
                            placeholder="Mot de passe" 
                            name="password" 
                            onChange={(event) => {
                                setPassword(event.target.value);
                              }}
                            value={password} 
                        />
                </div>
                <button type="submit" onClick={handleOnSubmit} className="submit-btn">Connexion</button>
                <h5 style={{color:"white"}}>Pas encore compte <Link style={{color:"green"}} to="/register">S'inscrire</Link></h5>
        </div>
    </div>
</div>
  )
}
