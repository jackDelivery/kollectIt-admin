import React, { useRef, useContext, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useState } from "react";
import "./PaymentData.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";

export default function PaymentData() {
  const [allData, setallData] = useState([]);
  const [realTime, setRealTime] = useState(true);
  const [ObjId, setObjId] = useState("");
  const [OnData, setOnData] = useState("");
  // const [DueOn, setDueOn] = useState("");
  // const [DownOn, setDownOn] = useState("");
  const [Imagelink, setImagelink] = useState([]);

  let drawOnref = useRef();
  let dueOnref = useRef();

  const UserCredentials = useContext(StoreContext);

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/multiFilteredPayments",
      data: {
        filter: {
          BelongsTo: UserCredentials.UserData._id,
        },
      },
    }).then((response) => {
      console.log(response.data, "response");
      setallData(response.data);
    });
  }, [realTime]);

  // useEffect(() => {
  //     axios({
  //         method: "get",
  //         url: Url + "/",
  //     }).then((response) => {
  //         // console.log(response.data,"response")
  //         setallData(response.data.Data)
  //     })
  // }, [realTime])

  // console.log(allData, "allData");

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
    // setImagelink(e.imageUrl)
    // setObjId(e._id)
    setOnData(e);
  }
  console.log(OnData.imageUrl, "rrrrr");
  function handler(params) {
    console.log(dueOnref.current.value);

    axios({
      method: "put",
      url: Url + "/UpdateFilteredPayments",
      data: {
        filter: {
          _id: OnData.ObjId,
        },
        update: {
          drawOn: drawOnref.current.value,
          dueOn: dueOnref.current.value,
        },
      },
    })
      .then((res) => {
        console.log(res.data, "response");
        setRealTime(!realTime);
      })
      .catch((error) => [console.log(error, "error")]);
  }

  return (
    <div>
      <input
        type="text"
        id="myInput"
        onChange={myFunction}
        placeholder="Search for names.."
        title="Type in a name"
      ></input>
      <div class=" overflow-auto" style={{ maxHeight: "110vh" }}>
        <table id="myTable">
          <tr class="header">
            <th>Verify.Code</th>
            <th>Name</th>
            <th>Draw On</th>
            <th>Payment Status</th>
            <th>Due On</th>
            <th>Image</th>
            <th>Staus</th>
            <th>Action</th>
          </tr>
          {!allData.length ? (
            <>
              <h1 className="text-center">No Data</h1>
            </>
          ) : (
            <>
              {allData.map((v, index) => {
                console.log(v);
                return (
                  <tr>
                    <td className="text-center">{v.VerificationCode}</td>
                    <td>{v.PaymentName}</td>
                    <td>{v.drawOn}</td>
                    <td>{v.PaymentStatus}</td>
                    <td className="text-center">{v.dueOn}</td>
                    <td>
                      <img src={v.imageUrl} id="tableImage" />
                    </td>
                    <td>{v.status}</td>
                    <td>
                      <td>
                        <button
                          class="badge badge-primary rounded-pill d-inline"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => creatID(v)}
                        >
                          view
                        </button>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </table>
      </div>
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content" style={{ width: "115%" }}>
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h1 class="modal-title">View & Update</h1>
              <button
                type="button"
                class="btn btn-danger close"
                data-dismiss="modal"
              >
                X
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <table id="myTable">
                <td>
                  <img
                    src={OnData.imageUrl}
                    alt="Girl in a jacket"
                    width="500rem"
                    height="300"
                  ></img>
                  <th style={{ width: "40%" }}>
                    <input
                      type="text"
                      ref={drawOnref}
                      placeholder={`Draw On ${OnData.drawOn}`}
                    />
                  </th>
                  <th style={{ width: "40%" }}>
                    <input
                      type="text"
                      ref={dueOnref}
                      placeholder={`Due On ${OnData.dueOn}`}
                    />
                  </th>
                  {/* <br />
                                    <th style={{ width: "40%" }}><input type="text" placeholder='PaymentMode' /></th>
                                    <th style={{ width: "40%" }}><input type="text" placeholder='status' /></th> */}
                </td>
              </table>
            </div>

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              {/* <button value={value} onClick={() => handleSubmit(value)}>Submit</button> */}
              <button
                id="sumbit"
                aria-label=""
                class="btn btn-success close"
                data-dismiss="modal"
                onClick={() => handler()}
              >
                {" "}
                SUMBIT
              </button>
              {/* <button type="button" onClick={handleSubmit} value={value} class="btn btn-success close">Submit</button> */}
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
