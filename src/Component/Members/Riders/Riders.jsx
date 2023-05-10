import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Url } from '../../../Pages/Core';






export default function Riders() {

  const [allData, setallData] = useState([]);


  useEffect(() => {
    axios({
      method: "get",
      url: Url + '/auth/RiderEmploye',
    }).then((response) => {
      // console.log(response.data,"response")
      setallData(response.data)
    })
  }, [])


  return (
    <div class="card card-cascade narrower">
      <div class="container mt-3">
        <h2>Riders</h2>

        <table class="table table-hover">
          <thead class="bg-light">
            <tr>
              <th>Rider Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Stutus</th>
              <th>Position</th>
              <th>Action/Roles</th>
            </tr>
          </thead>
          <tbody>
          {allData.map((v, i) => {
              return (
                <tr>
                  <td>{v.employeeName}</td>
                  <td>{v.employeeEmail}</td>
                  <td>{v.employeePassword}</td>
                  <td>
                    <span class="badge badge-success rounded-pill d-inline">Active</span>
                  </td>
                  <td>Senior</td>
                  <td><button  class="btn btn-primary btn-rounded">{v.Role}</button></td>
                </tr>

              )
            })}
            {/* <tr>
              <td>Mary</td>
              <td>mary@example.com</td>
              <td>Moe</td>
              <td>
                <span class="badge badge-primary rounded-pill d-inline"
                >Onboarding</span
                >
              </td>
              <td>Junior</td>
            </tr>
            <tr>
              <td>July</td>
              <td>july@example.com</td>
              <td>Dooley</td>
              <td>
                <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
              </td>
              <td>Senior</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
