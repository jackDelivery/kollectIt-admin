import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Url } from '../../Pages/Core'
import axios from 'axios';
import SMSlegerList from './SMSlegerList';
import StoreContext from '../../ContextApi';



export default function SMSleger() {

    const [allData, setallData] = useState([])
    const UserCredentials = useContext(StoreContext);
    const [refresher, setRefresher] = useState(false);
    const [BelongsID, setBelongsID] = useState(UserCredentials.UserData.Role)
    let ID = UserCredentials.UserData._id
    console.log(UserCredentials.UserData.createdBy, "UserCredentials");



    // console.log(allData);

    useEffect(() => {

        if (BelongsID == 'Admin') {
            axios({
                method: "Post",
                url: 'http://localhost:5000/smsLedger',
                data: {
                    "filter": {
                        "_id": "647880fd648ca7a0d083b1e2"
                    }
                }
            }).then((response) => {
                // console.log(response.data,"smsLedger=>Response");
                setallData(response.data)
            })
        } else {
            axios({
                method: "Post",
                url: 'http://localhost:5000/smsLedger',
                data: {
                    "filter": {
                        "createdBy": UserCredentials.UserData.createdBy
                        // "createdBy": "646f09d7d9957a50a32abb4c"
                    }
                }
            }).then((response) => {
                // console.log(response.data,"smsLedger=>Response");
                setallData(response.data)
            })


        }
    }, [])

    return (
        <>
            <div class="card card-cascade narrower">
                <div class="container mt-3">
                    <h2>SMS Leger</h2>

                    <table class="table table-hover">
                        <thead class="bg-light">
                            <tr>
                                <th>Date</th>
                                <th>Mode</th>
                                <th>Qty</th>
                                <th>Sender</th>
                                <th>Client</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.map((v) => <SMSlegerList alldata={v} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
