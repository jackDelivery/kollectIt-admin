import React from 'react';
import './Table.css';

export default function Table() {
  return (
    <div>
        <table className='table'>
            <tr>
                <th>A fintech division of Pacific Financial Services (Pvt) Limited</th>
                <td></td>
            </tr>
            <tr>
                <th>Invoice Number</th>
                <td>0001-151</td>
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
                <th>Net Amount</th>
                <td>10,000</td>
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
