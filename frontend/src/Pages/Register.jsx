import React, {  useState } from 'react';
import '../Assets/css/App.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Register = () => {
    const redirect = useNavigate();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/auth/register`,
            data: {
                firstName: nom,
                lastName: prenom,
                email: email,  
                password: password,
            },
          })
            .then((res) => {
              toast.success('Inscription avec succèss', {
                position: toast.POSITION.TOP_RIGHT
            });
                redirect('/');
            })
            
            .catch((err) => {
              toast.error('Il y a une erreur', {
                position: toast.POSITION.TOP_RIGHT
            });
              console.log(err);
            });
    }
  return (
    <div className='container'>
        <div className="form-structor">
            <div className="signup">
                    <h2 className="form-title" id="signup">Inscription</h2>
                    <div className="form-holder">
                        <input type="text" 
                            className="input" 
                            placeholder="Nom"
                            name="nom" 
                            onChange={(event) => {
                                setNom(event.target.value);
                              }}
                            value={nom}
                        />
                        <input type="text" 
                            className="input" 
                            placeholder="Prénom"
                            name="prenom" 
                            onChange={(event) => {
                                setPrenom(event.target.value);
                              }}
                            value={prenom} 
                        />
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
                    <button type="submit" onClick={handleOnSubmit} className="submit-btn">Inscription</button>
                    <h5 style={{color:"white"}}>Possède un compte <Link style={{color:"green"}} to="/">Se connecter</Link></h5>
            </div>
        </div>
    </div>
  )
}
