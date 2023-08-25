import { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import StoreContext from "../../ContextApi";
import { CSVLink } from "react-csv";
import { Url } from "../../Pages/Core";
import axios from "axios";
import React from "react";
import "./Transaction.css";
import moment from "moment";

export default function TransactionList() {
  const [dataTras, setDatatras] = useState([]);
  const [fromName, setFromName] = useState([]);
  const [toName, setToName] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);

  const headers = [
    { label: "Date", key: "createdOn" },
    { label: "Nature", key: "Nature" },
    { label: "From", key: "From" },
    { label: "to", key: "to" },
    { label: "Amount", key: "PaymentAmount" },
    { label: "Stutus", key: "Active" },
  ];

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/auth/filterTransaction",
      data: {
        filter: {
          BelongsTo: UserCredentials.UserData._id,
        },
      },
    })
      .then((res) => {
        // console.log(res.data, "resss");
        setDatatras(res.data);
        transaction(res.data);
      })
      .catch((err) => {});
  }, []);

  function transaction(data) {
    for (let i = 0; i < data.length; i++) {
      const traData = data[i];

      //   console.log(traData.to, "to");
      //   console.log(traData.From, "from");

      // for to
      axios({
        method: "post",
        url: Url + "/auth/empolyeeClientData",
        data: {
          EmployeeObjectId: traData.to,
        },
      })
        .then((res) => {
          // console.log(res.data, "in Internal Transfer to API");
          setToName(res.data.Employee[0].employeeName);
          // setDate()
        })
        .catch((error) => {
          console.error("Error in Internal transfer to ", error);
        });

      //for from
      axios({
        method: "post",
        url: Url + "/auth/empolyeeClientData",
        data: {
          EmployeeObjectId: traData.From,
        },
      })
        .then((res) => {
          //   console.log(res.data, "in Internal Transfer from API");
          setFromName(res.data.Employee[0].employeeName);
        })
        .catch((error) => {
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

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  return (
    <div class="card card-cascade narrower">
      <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
        <h2>Transaction List</h2>
      
        <CSVLink
          headers={headers}
          filename="Transaction List.csv"
          data={dataTras}
          ref={csvLinkEl}
        />
        <div className="d-flex flex-row-reverse m-2">
          <button
            class="btn text-white"
            style={{ background: "#427D8F", fontSize: 15 }}
            onClick={downloadReport}
            role="button"
          >
            Export
            <i class="far fa-circle-down mx-2 "></i>
          </button>
        </div>

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
                <tr key={i}>
                  <td>{moment(v.createdOn).format("llll")}</td>
                  <td>{v.Nature}</td>
                  <td>{fromName}</td>
                  <td>{toName}</td>
                  <td>{v.PaymentAmount}</td>
                  <td>
                    <span class="badge badge-primary rounded-pill d-inline">
                      Active
                    </span>
                  </td>
                </tr>
              );
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
  );
}
