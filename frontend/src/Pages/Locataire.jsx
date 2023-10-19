import { useEffect, useState } from 'react';
import '../Assets/css/Locataire.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Locataire = () => {
    const [isAdd, setIsAdd] = useState(false);
    const [isList, setIsList] = useState(true);
    const pageAdd = () => {
        setIsAdd(true);
        setIsList(false);
    }
    const pageList = () => {
        setIsList(true);
        setIsAdd(false);
    }

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [adresse, setAdresse] = useState('');
    const [telephone, setTelephone] = useState('');
    const [listBien,setListBien] = useState([])

    const [listLocataire, setListLocataire] = useState([]);


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/tenant`,
            data: {
                firstName: nom,
                lastName: prenom,
                email: email,  
                address: adresse.split('-')[1],
                telephone:telephone,
                belongingsid:adresse.split('-')[0]
            },
          })
            .then((res) => {
                toast.success('Ajout de nouveau locataire avec success', {
                    position: toast.POSITION.TOP_RIGHT
                });
                window.location.reload(false);
            })
            .catch((err) => {
              console.log(err);
            });
    }

    const getLocataire = async (e) => {
        await axios({
            method: 'GET',
            url: `http://localhost:5000/api/tenant/utilisateur`,
        }).then((res) => {
            setListLocataire(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const deleteLocataire = async (idLocataire,idBien) => {
        await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/tenant/${idLocataire}/${idBien}`,
          })
            .then((res) => {
                toast.success('Suppression de Locataire avec success', {
                    position: toast.POSITION.TOP_RIGHT
                });
              window.location.reload(false);
            })
            .then((error) => {
              console.log(error);
            });
    }
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
    useEffect(() => {
        getLocataire();
        getBien();
      }, []);

    return (
        <div className='dashLocataire'>
            <div className='btnGroup'>
                <button onClick={() => pageList()}>Liste</button>
                <button onClick={() => pageAdd()}>Ajout</button>
            </div>

            {isAdd &&
                <div className='ajoutLocataire'>
                    <h2>Ajouter nouveau locataire</h2>
                    <form onSubmit={handleOnSubmit}>
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
prenom                        />
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
                            {listBien.length>0?(
                                listBien.map((val,key)=>{
                                    return( <option key={val._id} value={`${val._id}-${val.address}`}>{val.address}</option>)
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
                        <input type="submit" value="Ajouter" />
                    </form>
                </div>
            }

            {isList &&
                <div className='listLocataire'>
                   
                    <h2>Liste des locataires</h2>
                    <div className="table-locataire">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Mail</th>
                                    <th>Adresse</th>
                                    <th>Télephone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                               listLocataire.length >0 ? (
                                listLocataire.map((val,key)=>{
                                    return (
                                <tr key={val.key}>
                                    <td>{val.firstName}</td>
                                    <td>{val.lastName}</td>
                                    <td>{val.email}</td>
                                    <td>{val.address}</td>
                                    <td>{val.telephone}</td>
                                    <td>
                                        <Link to={`/locataire-modif/${val._id}`} className='update'>Modifier</Link>
                                        <Link to="#" className='delete' onClick={() =>deleteLocataire(val._id,val.userId)}>Supprimer</Link>
                                    </td>
                                </tr>
                                    )})
                               ):(<tr> <td colSpan={6}>Pas encore de locataire</td></tr>)
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </div>
    );
};

export default Locataire;