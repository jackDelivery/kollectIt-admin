import React, { useEffect, useState, useContext, useRef } from "react";
import StoreContext from "../../ContextApi";
import { Url } from "../../Pages/Core";
import { CSVLink } from "react-csv";
import "./ClientData.css";
import axios from "axios";

export default function ClientData() {
  const [allData, setallData] = useState([]);
  const UserCredentials = useContext(StoreContext);
  const csvLinkEl = useRef(null);

  const headers = [
    { label: "ClientId", key: "ClientId" },
    { label: "Name", key: "ClientName" },
    { label: "Number", key: "ClientPhoneNumber" },
    { label: "Email", key: "ClientEmail" },
    { label: "Amount", key: "ClientAmount" },
  ];

  useEffect(() => {
    if (UserCredentials.UserData.Role === "Admin") {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            BelongsTo: UserCredentials.UserData._id,
          },
        },
      }).then((response) => {
        setallData(response.data);
      });
    } else {
      axios({
        method: "post",
        url: Url + "/filteredClients",
        data: {
          filter: {
            AssignedBy: UserCredentials.UserData._id,
          },
        },
      }).then((response) => {
        setallData(response.data);
      });
    }
  }, []);

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

  const downloadReport = async () => {
    setTimeout(() => {
      csvLinkEl.current.link.click();
    });
  };

  return (
    <div>
      <CSVLink
        headers={headers}
        filename="Client Data.csv"
        data={allData}
        ref={csvLinkEl}
      />
      <h1 className="text-center">Client List</h1>
      <div className="d-flex flex-row-reverse m-2">
        <button
          class="btn text-white"
          style={{ background: "#427D8F", fontSize: 15, marginTop: "-3%", padding:10}}
          onClick={downloadReport}
          role="button"
        >
          Export
          <i class="far fa-circle-down mx-2 "></i>
        </button>
      </div>
      <input
        type="text"
        id="myInput"
        onChange={myFunction}
        placeholder="Search for names.."
        title="Type in a name"
      ></input>
      <div className="overflow-auto" style={{ maxHeight: "110vh" }}>
        <table id="myTable">
          <tr class="header">
            <th style={{ width: 60 }}>ClientId</th>
            <th style={{ width: 60 }}>Name</th>
            <th style={{ width: 60 }}>Number</th>
            <th style={{ width: 60 }}>Email</th>
            <th style={{ width: 60 }}>Amount</th>
          </tr>
          {allData.map((v, index) => {
            return (
              <tr>
                <td>{v.ClientId}</td>
                <td>{v.ClientName}</td>
                <td>+{v.ClientPhoneNumber}</td>
                <td>{v.ClientEmail}</td>
                <td>{v.ClientAmount}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
