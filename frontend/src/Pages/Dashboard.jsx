import React, { useContext } from 'react';
import '../Assets/css/Accueil.scss';
import AuthContext from '../context/AuthContext';


const Dashboard = () => {
    const { loggedIn } = useContext(AuthContext);
    return (
        <div className='dashContainer'>
            <h1>LOCATIVE</h1>
            <h1>MADAGASCAR</h1>
        </div>
    );
};

export default Dashboard;