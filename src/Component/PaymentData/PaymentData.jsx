import React, { useRef, useMemo, useEffect } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { useState } from 'react';
import './PaymentData.css'
import axios from 'axios';
import { Url } from '../../Pages/Core';





export default function PaymentData() {

    const [allData, setallData] = useState([])
    const [Imagelink, setImagelink] = useState([])


    useEffect(() => {
        axios({
            method: "get",
            url: Url + "/",
        }).then((response) => {
            // console.log(response.data,"response")
            setallData(response.data.Data)
        })
    }, [])

    console.log(allData, "allData");

    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function creatID(e) {
        console.log(e, "Ee");
        setImagelink(e.imageUrl)
    }
    console.log(Imagelink);
    return (
        <div>

            <input type="text" id="myInput" onChange={myFunction} placeholder="Search for names.." title="Type in a name"></input>

            <table id="myTable">
                <tr class="header">
                    <th>Verify.Code</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Image</th>
                    <th>Staus</th>
                    <th>Action</th>
                </tr>
                {allData.map((v, index) => {
                    return (
                        <tr>
                            <td className='text-center'>{v.VerificationCode}</td>
                            <td>{v.PaymentName}</td>
                            <td>{v.PaymentNumber}</td>
                            <td>{v.PaymentEmail}</td>
                            <td className='text-center'>{v.PaymentAmount}</td>
                            <td><img src={v.imageUrl} id='tableImage' /></td>
                            <td>{v.status}</td>
                            <td>
                                <td>
                                    <button class="badge badge-primary rounded-pill d-inline" data-toggle="modal" data-target="#myModal" onClick={() => creatID(v)}>view</button>
                                </td>
                            </td>
                        </tr>
                    )
                })}
            </table>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h1 class="modal-title">View & Update</h1>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">
                            <table id="myTable">
                                <td>
                                    <img src={Imagelink} alt="Girl in a jacket" width="500" height="300"></img>
                                    <th style={{ width: "40%" }}><input type="text" placeholder='Quata Amount' /></th>
                                    <th style={{ width: "40%" }}><input type="text" placeholder='Quata Amount' /></th>
                                </td>

                            </table>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
                            <button id='sumbit' aria-label='' class="btn btn-success close" data-dismiss="modal"> SUMBIT</button>
                            {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};
