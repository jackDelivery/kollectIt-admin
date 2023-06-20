import axios from 'axios';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Url } from '../../Pages/Core';



export default function AddQuotaList(data) {

    const [allData, setallData] = useState([])
    const [BelongsID, setBelongsID] = useState("")
    const [QuotaValue, setQuotaValue] = useState(null)
    const value = React.useMemo(() => updateValue(BelongsID), [BelongsID])
    const [realTime, setRealTime] = useState(true);


    useEffect(() => {
        // setreloadData(false)
        axios({
            method: "post",
            url: Url + "/filteredQuota",
            data: {
                "filter": {
                    "BelongsTo": data.alldata._id
                }
            }
        }).then((response) => {
            setallData(response.data)
        })
    }, [realTime])


    const createBelongsID = (v) => {
        setBelongsID(v.BelongsTo)
    }


    useEffect(() => {
        document.getElementById('sumbit').setAttribute('aria-label', value)
    }, [value])



    const handleSubmit = (e) => {
        // console.log('KJKJ', e.target.ariaLabel)
        axios({
            method: "post",
            url: Url + "/AddQuota",
            data: {
                BelongsTo: e.target.ariaLabel,
                amount: parseInt(QuotaValue)
            }
        }).then((response) => {
            // if (response.data.message == "Limit Update") {
            //     console.log(';kjk')
            // }
            console.log(response);
            setRealTime(!realTime);
        })

    }

    return (
        <>
            <tr>
                <td>{data.alldata.employeeName}</td>
                <td>{data.alldata.employeeEmail}</td>
                {""}
                {allData.map((v, i) => {
                    // console.log(v.BelongsTo);
                    return (
                        <>
                            <td>{v.Limit}</td>
                            <td>
                                <button type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal" onClick={() => createBelongsID(v)}>
                                    Add Quota
                                </button>
                            </td>
                        </>
                    )
                })}
                {/* </td> */}
            </tr>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h1 class="modal-title">Limits Update</h1>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <table id="myTable">
                                <th style={{ width: 60 }}><input type="text" placeholder='Quota Amount' onChange={(e) => setQuotaValue(e.target.value)} /></th>
                            </table>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                            <button id='sumbit' aria-label='' onClick={handleSubmit} class="btn btn-success close" data-dismiss="modal"> SUMBIT</button>
                            {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}

const updateValue = (id) => {
    console.log("ID", id)
    return id
}