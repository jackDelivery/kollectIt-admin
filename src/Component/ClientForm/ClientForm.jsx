import React, { useEffect, useRef, useState } from 'react';
import { Table, Radio, Divider, InputNumber, message } from 'antd';
import './ClientForm.css';
import axios from 'axios';
import { RestFilled } from '@ant-design/icons';
import { Url } from '../../Pages/Core';



export default function ClientForm() {


  const ClientId = useRef()
  const ClientName = useRef()
  const ClientEmail = useRef()
  const ClientPhoneNumber = useRef()
  const ClientAmount = useRef()

  const FormSubmit = () => {

    // console.log(ClientId.current.value, ClientName.current.value, ClientEmail.current.value, ClientPhoneNumber.current.value, ClientAmount.current.value, 'This is a success message');
    axios({
      method: 'post',
      url: Url+"/ClientData",
      data: {
        ClientId: ClientId.current.value,
        ClientName: ClientName.current.value,
        ClientEmail: ClientEmail.current.value,
        ClientAmount: ClientAmount.current.value,
        ClientPhoneNumber: ClientPhoneNumber.current.value,
      }

    }).then(response => {
      console.log(response, "response ")
      alert("data has been submitted!")
      ClientId.current.value = ""
      ClientName.current.value = ""
      ClientEmail.current.value = ""
      ClientAmount.current.value = ""
      ClientPhoneNumber.current.value = ""
    })
      .catch(error => {
        console.log(error, "error")
      })


  };



  return (
    <div>
      Client Form
      <br />
      <br />

      <div class="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            FormSubmit();
          }}>
          <div class="row">
            <div class="col-25">
              <label for="fname">Client Id</label>
            </div>
            <div class="col-75">
              <input type="text" id="fname" name="firstname" ref={ClientId} placeholder="Client Id.." required />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="fname">Client Name</label>
            </div>
            <div class="col-75">
              <input type="text" id="fname" name="firstname" ref={ClientName} placeholder="Client name.." required />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="lname">Client Contact Number</label>
            </div>
            <div class="col-75">
              <input type="text" id="lname" name="lastname" ref={ClientPhoneNumber} placeholder="Client Phone Number.." />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="lname">Client Email</label>
            </div>
            <div class="col-75">
              <input type="text" id="lname" name="lastname" ref={ClientEmail} placeholder="Client Email.." />
            </div>
          </div>
          <div class="row">
            <div class="col-25">
              <label for="lname">Client Amount</label>
            </div>
            <div class="col-75">
              <input type="text" id="lname" name="lastname" ref={ClientAmount} placeholder="Client Amount.." />
            </div>
          </div>
          <br />
          <div class="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
