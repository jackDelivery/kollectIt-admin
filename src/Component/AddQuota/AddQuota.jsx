import React, { useState, useEffect, useCallback } from "react";
import { Url } from "../../Pages/Core";
import axios from "axios";
import AddQuotaList from "./AddQuotaList";

export default function AddQuota() {
  const [allData, setallData] = useState([]);
  const [refresher, setRefresher] = useState(false);

  const getAllData = () => {
    console.log("ll");
    axios({
      method: "get",
      url: Url + "/auth/AdminEmploye",
    }).then((response) => {
      console.log(response.data, "response");
      setallData(response.data);
    });
  };

  useEffect(getAllData, []);

  return (
    <>
      <div class="card card-cascade narrower">
        <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
          <h2>Add Quota</h2>

          <table class="table table-hover">
            <thead class="bg-light">
              <tr>
                <th>Admin Name</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                {/* <th>Stutus</th> */}
                {/* <th>Position</th> */}
                <th>Credit Blance</th>
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
