import {  useState,useEffect } from 'react';
import '../Assets/css/Bien.scss';
import { Link} from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';


const Bien = () => {

    const [type, setType] = useState('');
    const [rent, setRent] = useState('');
    const [surface, setSurface] = useState('');
    const [address, setAddress] = useState('');
    const [listBien,setListBien] = useState()

    const handleBien = async (e) => {
        e.preventDefault();
        await axios({
            method: 'POST',
            url: `http://localhost:5000/api/belongings`,
            data: {
                type: type,
                rent: rent,
                surface: surface,  
                address: address,
            },
        }).then((res) => {
            toast.success('Ajout de bien avec succèss', {
                position: toast.POSITION.TOP_RIGHT
            });
            window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const getBien = async (e) => {
        await axios({
            method: 'GET',
            url: `http://localhost:5000/api/belongings/utilisateur`,
        }).then((res) => {
            setListBien(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const deleteBien = async (idBien) => {
        await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/belongings/${idBien}`,
          })
            .then((res) => {
                toast.success('Suppression de bien avec succèss', {
                    position: toast.POSITION.TOP_RIGHT
                });
              window.location.reload(false);
            })
            .then((error) => {
              console.log(error);
            });
    }
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

    useEffect(() => {
        getBien()
      }, []);
    return (
        <div className='dashBien'>
            <div className='btnGroup'>
                <button onClick={() => pageList()}>Liste</button>
                <button onClick={() => pageAdd()}>Ajout</button>
            </div>
            {isAdd &&
                <div className='ajoutBien'>
                    <h2>Ajouter nouveau bien</h2>
                    <form onSubmit={handleBien}>
                        <select id="cars" 
                                name="type"
                                onChange={(e) => {
                                    setType(e.target.value);
                                  }}
                        >
                            <option>Type de bien</option>
                            <option value={`appartement`}>Appartement</option>
                            <option value={`maison`}>Maison</option>
                        </select>
                        <input type="number" 
                                name="rent" 
                                placeholder='Loyer ...' 
                                onChange={(e) => {
                                    setRent(e.target.value);
                                  }}
                        />
                        <input type="text" 
                                name="surface" 
                                placeholder='Surface ...'
                                onChange={(e) => {
                                    setSurface(e.target.value);
                                  }} 
                        />
                        <input type="text" 
                                name="address" 
                                placeholder='Adresse ...' 
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                        />
                        <input type="submit" value="Ajouter" />
                    </form>
                </div>
            }

            {isList &&
                <div className='listBien'>
                    <h2>Liste des biens</h2>
                    <div class="table-bien">
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Loyer</th>
                                    <th>Surface</th>
                                    <th>Adresse</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listBien && listBien.length >0?(listBien.map((val,key)=>{
                                        return (
                                            <tr key={val._id}>
                                                <td>{val.type}</td>
                                                <td>{val.rent} Ar</td>
                                                <td>{val.surface}</td>
                                                <td>{val.address}</td>
                                                <td>
                                                    <Link to={`/bien-modif/${val._id}`} className='update'>Modifier</Link>
                                                    <Link to="#" className='delete' onClick={() =>deleteBien(val._id)}>Supprimer</Link>
                                                </td>
                                            </tr>
                                            );
                                    })):(<tr><td colSpan={5}>Pas encore de bien</td></tr>)
                                    
                                } 
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </div>
    );
};

export default Bien;