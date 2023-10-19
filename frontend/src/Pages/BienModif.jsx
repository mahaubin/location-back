import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BienModif = () => {
    const { id } = useParams();
    const redirect = useNavigate();
    const [type, setType] = useState('');
    const [rent, setRent] = useState('');
    const [surface, setSurface] = useState('');
    const [address, setAddress] = useState('');

    const handleBien = async (e) => {
        e.preventDefault();
        const dataToSend = {};

        if(type) {
        dataToSend.type = type; 
        }

        if(rent) {
        dataToSend.rent = rent;
        }

        if(surface) {
        dataToSend.surface = surface; 
        }

        if(address) {
        dataToSend.address = address;
}
        await axios({
            method: 'PUT',
            url: `http://localhost:5000/api/belongings/${id}`,
            data: dataToSend,
        }).then((res) => {
            redirect('/bien');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return (
        <div className='modifBien'>
            <div className='ajoutBien'>
                <h2>Modification du bien</h2>
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
                        <input type="submit" value="Modifier" />
                    </form>
            </div>
        </div>
    );
};

export default BienModif;