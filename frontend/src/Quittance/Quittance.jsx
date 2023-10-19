import React from 'react';
import '../Assets/css/Quitance.scss';

const Quittance = () => {
    return (
        <div className="invoice-box">
            <table>
                <tr className="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    <b>Bailleur :</b><br />
                                    JEAN Pierre<br />
                                    4 rue de paris, 75016 Paris<br /><br />
                                    <b>Tél : </b> 06 98 76 54<br />
                                    <b>Email : </b> thier
                                </td>
                                <td className="title">
                                    <h3>Quittance</h3>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <tr className="information">
                    <td colspan="2">
                        <table>
                            <tr style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                                <td>
                                    <b>Locataire : </b><br />
                                    Pierre Legrand<br />
                                    4 rue de paris, 42347 Bordeaux<br />
                                </td>

                                <td style={{ 'textAlign': 'left' }}>
                                    <b>Date de la quittance : </b> 30 mai 2024<br />
                                    <b>Date de paiement : </b> 05 mai 2024<br />
                                    <b>Mois de location : </b> mai 2024<br />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table>
                <tr className="heading">
                    <td>Objet de paiement</td>
                    <td>paiement</td>
                    <td>Charges</td>
                    <td>Loyer hors charge</td>
                </tr>

                <tr className="details">
                    <td>Loyer</td>
                    <td>Espece</td>
                    <td style={{'textAlign':'right'}}>200,00 €</td>
                    <td style={{'textAlign':'right'}}>1.200,00 €</td>
                </tr>

                <tr className="details">
                    <td><b>Versement CAF :</b></td>
                    <td colspan="2"></td>
                    <td style={{'textAlign':'right'}}>120,00 €</td>
                </tr>
            </table>

            <p style={{ 'padding': '25px 0', 'textAlign': 'justify' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolor cumque iure nobis earum laudantium magnam atque illum maxime possimus, excepturi ex repellat adipisci! Possimus ducimus cumque (-1.000 €)
            </p>

            <table>
                <tr className="item">
                    <td><b>Loyer charge à payer</b></td>

                    <td>2.000 €</td>
                </tr>

                <tr className="item">
                    <td><b>Prevension pour charge</b></td>

                    <td>200 €</td>
                </tr>

                <tr className="item">
                    <td><b>Total à payer</b></td>

                    <td>2.400 €</td>
                </tr>

                <tr className="item">
                    <td><b>Montant payé</b></td>

                    <td><b>2.400 €</b></td>
                </tr>
            </table>
        </div>
    );
};

export default Quittance;