import {React,useEffect,useState} from 'react';
import './Table.css';
import logo from './tecstik.png'

export default function Table({billObject}) {
    const[invoice,setInvoice]=useState('-');
    const[netAmount,setnetAmount]=useState('-');
    useEffect(() => {
     
        console.log("BillObject in Table use effect",billObject);
        setInvoice(billObject.Bill_Number);
        setnetAmount(billObject.Aamount_within_dueDat)
    
    
      }, [billObject]);
  return (
    <div className='tableComponent'>
        <table className='table'>
           
            <tr>
                <th colspan="2">
                <img className='logo' src={logo} alt="" />
                </th>
                <td></td>

            </tr>
            <tr>
                <th>A fintech division of Pacific Financial Services (Pvt) Limited</th>
                <td></td>
            </tr>
            <tr>
                <th>Invoice Number</th>
                <td>{invoice}</td>
            </tr>
            <tr>
                <th>Description</th>
                <td></td>
            </tr>
            <tr>
                <th>Subscription fees for utuilization of KollectIIt App</th>
                <td></td>
            </tr>
            <tr>
                <th> Net Amount</th>
                <td>{netAmount}</td>
            </tr>
            <tr>
                <th>Sales Tax @13%</th>
                <td>1300</td>
            </tr>
            <tr>
                <th>Bank Charges</th>
                <td>250</td>
            </tr>
            <tr>
                <th>Gross Payable</th>
                <td>113500</td>
            </tr>
        </table>
    </div>
  )
}
