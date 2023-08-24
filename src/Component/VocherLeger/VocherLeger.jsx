import React, { useState, useEffect, useContext } from "react";
import { Url } from "../../Pages/Core";
import axios from "axios";
import VocherLegerList from "./VocherLegerList";
import StoreContext from "../../ContextApi";

export default function VocherLeger() {
  const [prevBalance, setPrevBalance] = useState(0);
  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  // let Url = "http://localhost:5000";
  //   const [BelongsID, setBelongsID] = useState(UserCredentials.UserData.Role);
  //   const [refresher, setRefresher] = useState(false);
  //   let ID = UserCredentials.UserData._id;
  //   console.log(UserCredentials.UserData, "UserCredentials");
  // console.log(allData);

  useEffect(() => {
    if (UserCredentials.UserData.Role == "Admin") {
      axios({
        method: "Post",
        url: Url + "/filteredVoucher",
        data: {
          filter: {
            // BelongsTo: UserCredentials.UserData._id,
            BelongsTo: "63db55cf07ec951109a359c7",
          },
        },
      }).then((response) => {
        console.log(response.data, "smsLedger=>Response");
        setallData(response.data);
      });
    } else {
      axios({
        method: "Post",
        url: Url + "/smsLedger",
        data: {
          filter: {
            createdBy: UserCredentials.UserData.createdBy,
            // "createdBy": "646f09d7d9957a50a32abb4c"
          },
        },
      }).then((response) => {
        // console.log(response.data,"smsLedger=>Response");
        setallData(response.data);
      });
    }
  }, []);

  return (
    <>
      <div class="card card-cascade narrower">
        <div class="container mt-3 overflow-auto" style={{ maxHeight: "110vh" }}>
          <h2>Vocher Leger</h2>

          <table class="table table-hover">
            <thead class="bg-light">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((v) => (
                <VocherLegerList alldata={v} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
