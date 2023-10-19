import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const LocataireModif = () => {

    const { id } = useParams();
    const redirect = useNavigate();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [listBien,setListBien] = useState([]);
    const getBien = async (e) => {
        await axios({
            method: 'GET',
            url: `http://localhost:5000/api/belongings/status`,
        }).then((res) => {
            setListBien(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const handleLocataire = async (e) => {
        e.preventDefault();
        const dataToSend = {};
        if(nom) {
        dataToSend.nom = nom; 
        }

        if(prenom) {
        dataToSend.prenom = prenom;
        }

        if(email) {
        dataToSend.email = email; 
        }

        if(adresse) {
        dataToSend.adresse = adresse.split('-')[1];
        }
        if(adresse) {
            dataToSend.belongingsid = adresse.split('-')[0];
        }
        if(telephone) {
            dataToSend.telephone = telephone;
            }
        console.log(dataToSend)
        await axios({
            method: 'PUT',
            url: `http://localhost:5000/api/tenant/${id}`,
            data:  {
                firstName: dataToSend.nom,
                lastName: dataToSend.prenom,
                email: dataToSend.email,  
                address: dataToSend.adresse,
                telephone:dataToSend.telephone,
                belongingsid:dataToSend.belongingsid
            }
        }).then((res) => {
            toast.success('Modification avec succèss', {
                position: toast.POSITION.TOP_RIGHT
            });
            redirect('/locataire')
        })
        .catch((err) => {
          console.log(err);
        });
    }
    useEffect(() => {
        getBien();
      }, []);

    return (
        <div className='modifLocataire'>
             <div className='ajoutLocataire'>
                    <h2>Modification locataire</h2>
                    <form onSubmit={handleLocataire}>
                        <input type="text" 
                            name="nom" 
                            placeholder='Nom ...' 
                            onChange={(event) => {
                                setNom(event.target.value);
                              }}
                            value={nom}
                        />
                        <input type="text" 
                            name="prenom" 
                            placeholder='Prenom ...'
                            onChange={(event) => {
                                setPrenom(event.target.value);
                              }}
                            value={prenom}                      
                        />
                        <input type="email" 
                            name="email" 
                            placeholder='Email ...' 
                            onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            value={email}
                        />

                        <select id="cars" 
                                name="address"
                                onChange={(e) => {
                                    setAdresse(e.target.value);
                                  }}
                        >
                            <option value={''}>Listes des adresses</option>
                            {
                             
                             listBien && listBien.length>0?(
                                listBien.map((val)=>{
                                    return( <option value={`${val._id}-${val.address}`}>{val.address}</option>)
                                })
                            ):(<option>Pas encore de bien</option>)
                            
                            }
                        </select>
                        <input type="tel" name="telephone" placeholder='Télephone ...' 
                            onChange={(event) => {
                                setTelephone(event.target.value);
                            }}
                            value={telephone}
                        />
                        <input type="submit" value="Modifier" />
                    </form>
                </div>
                
        </div>
    );
};

export default LocataireModif;