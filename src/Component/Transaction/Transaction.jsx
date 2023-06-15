
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Url } from "../../Pages/Core";
import './Transaction.css';
import StoreContext from "../../ContextApi";


export default function TransactionList() {

    const [dataTras, setDatatras] = useState([]);
    const [fromName, setFromName] = useState([]);
    const [toName, setToName] = useState([]);
    const UserCredentials = useContext(StoreContext);

    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/auth/filterTransaction",
            data: {
                "filter": {
                    "BelongTo": UserCredentials.UserData._id
                }
            }
        }).then(res => {
            // console.log(res.data, "resss");
            setDatatras(res.data)
            transaction(res.data)
        }).catch(err => {

        })
    }, [])



    function transaction(data) {
        for (let i = 0; i < data.length; i++) {

            const traData = data[i];

            console.log(traData.to, "to");
            console.log(traData.From, "from");

            // for to
            axios({

                method: "post",
                url: Url + "/auth/empolyeeClientData",
                data: {

                    EmployeeObjectId: traData.to
                }

            }).then((res) => {

                // console.log(res.data, "in Internal Transfer to API");
                setToName(res.data.Employee[0].employeeName)
                // setDate()

            }).catch((error) => {
                console.error("Error in Internal transfer to ", error);

            });


            //for from
            axios({
                method: "post",
                url: Url + "/auth/empolyeeClientData",
                data: {
                    EmployeeObjectId: traData.From
                }
            }).then((res) => {

                console.log(res.data, "in Internal Transfer from API");
                setFromName(res.data.Employee[0].employeeName);


            }).catch((error) => {
                console.error("Error in Internal transfer from ", error);

            });


            // //for from
            // axios({

            //     method: "post",
            //     url: Url + "/filteredClients",
            //     data: {
            //         "filter": {
            //             _id: traData.From
            //         }
            //     }


            // }).then((res) => {

            //     // console.log(res.data[0].CashierName, "in Internal Transfer from API");
            //     setFromName(res.data[0].CashierName);


            // }).catch((error) => {
            //     console.error("Error in Internal transfer from ", error);

            // });

        }
    }




    console.log(toName, "toName");
    return (
        <div class="card card-cascade narrower">
            <div class="container mt-3">
                <h2>Transaction List</h2>

                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th>Date</th>
                            <th>Nature</th>
                            <th>From</th>
                            <th>to</th>
                            <th>Amount</th>
                            <th>Stutus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataTras.map((v, i) => {
                            return (
                                <tr>
                                    <td>{v.createdOn}</td>
                                    <td>{v.Nature}</td>
                                    <td>{fromName}</td>
                                    <td>{toName}</td>
                                    <td>{v.PaymentAmount}</td>
                                    <td>
                                        <span class="badge badge-primary rounded-pill d-inline">Active</span>
                                    </td>

                                </tr>

                            )
                        })}

                        {/* <tr>
                            <td>Mary</td>
                            <td>mary@example.com</td>
                            <td>Moe</td>
                            <td>Junior</td>
                            <td>Junior</td>
                            <td>
                                <span class="badge badge-primary rounded-pill d-inline"
                                >Onboarding</span
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>July</td>
                            <td>july@example.com</td>
                            <td>Dooley</td>
                            <td>Senior</td>
                            <td>Senior</td>
                            <td>
                                <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

