import React, { useEffect, useState, useContext, useRef } from "react";
import { Url } from "../../Pages/Core";
import axios from "axios";
import AddQuotaList from "./AddQuotaList";
import { CSVLink } from "react-csv";

export default function AddQuota() {
  const [allData, setallData] = useState([]);
  const [refresher, setRefresher] = useState(false);
  const csvLinkEl = useRef(null);

  const headers = [
    { label: "Admin Name", key: "employeeName" },
    { label: "Email", key: "employeeEmail" },
    { label: "Limit", key: "Limit" },
    { label: "Credit Blance", key: "CreditBalance" },
  ];

  useEffect(() => {
    axios({
      method: "get",
      url: Url + "/auth/AdminEmploye",
    }).then((response) => {
      console.log(response.data, "response");
      setallData(response.data);
    });
  }, []);

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  return (
    <>
      <div class="card card-cascade narrower">
        <div
          class="container mt-3 overflow-auto"
          style={{ maxHeight: "110vh" }}
        >
          <h2>Add Quota</h2>
          <CSVLink
            headers={headers}
            filename="Quota Data.csv"
            data={allData}
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
                <th>Admin Name</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                {/* <th>Stutus</th> */}
                {/* <th>Position</th> */}
                <th>Limit</th>
                <th>Blance</th>
                <th>Add Quota</th>
                <th>Add Credit</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((v) => (
                <AddQuotaList alldata={v} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
