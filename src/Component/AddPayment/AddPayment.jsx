import React, { useEffect, useState, useContext, useRef } from "react";
import "./AddPayment.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";

export default function AddPayment() {
  const UserCredentials = useContext(StoreContext);
  const [targetAmount, settargetAmount] = useState("");
  const [PaymentAmount, setPaymentAmount] = useState("");
  // console.log(allData, "allData");

  // let = useRef()
  // let = useRef()
  console.log(PaymentAmount,"PaymentAmount");
  let JazzMobiNum = useRef();
  let JazzCNIC = useRef();

  let CreditCardNumber = useRef();
  let CreditCardHolder = useRef();
  let CreditMonth = useRef();
  let CreditYear = useRef();
  let CreditCvv = useRef();

  function JazzCashHandler(e) {
    // e.preventdefault();
    let body = {
      JazzMobiNum: JazzMobiNum.current.value,
      JazzCNIC: JazzCNIC.current.value,
    };
    console.log(body, "Jazz Cash");
  }

  function CreditHandler(e) {
    // e.preventdefault();
    let body = {
      CreditCardNumber: CreditCardNumber.current.value,
      CreditCardHolder: CreditCardHolder.current.value,
      CreditMonth: CreditMonth.current.value,
      CreditYear: CreditYear.current.value,
      CreditCvv: CreditCvv.current.value,
    };
    console.log(body, "Credit Card");
  }

  return (
    <div>
      <div class="col-12 mb-4">
        <div class="row box-right">
          <div class="col-md-4 ps-0 ">
            <p class="ps-3 textmuted fw-bold h6 mb-0">Your Blance</p>
            <p class="h1 fw-bold d-flex">
              <span class=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1"></span>
              00
              <span class="textmuted">.00</span>
            </p>
            <p class="ms-3 px-2 bg-green">+10% since last month</p>
          </div>
          <div class="col-md-4">
            <p class="text-warning mb-0">Payment Amount</p>
            <input
              type="text"
              name="card-num"
              placeholder="PKR 3000.00"
              size="17"
              id="cno"
              minlength="19"
              maxlength="19"
              onChange={(e) => setPaymentAmount(e.target.value)}
            />

          </div>
          <div class="col-md-4 mt-2">
            <button type="button" class="btn btn-primary mt-4">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* =========================> TABS */}
      <p class="ps-3 textmuted fw-bold h4 mb-0 text-center">
        Choose Payment Mode
      </p>
      <br />
      <ul
        class="nav nav-pills mb-3 justify-content-center"
        id="pills-tab"
        role="tablist"
      >
        <li class="nav-item">
          <a
            class="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Bank Trasfer
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            QR-Code
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-jazzcash-tab"
            data-toggle="pill"
            href="#pills-jazzcash"
            role="tab"
            aria-controls="pills-jazzcash"
            aria-selected="false"
          >
            JazzCash
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Credit or Debit Card
          </a>
        </li>
      </ul>

      {/* =========================> Payment  Amount field*/}

      <div
        class="col-4"
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        <p class="text-warning mb-0">Payment Amount</p>
        <input
          type="text"
          name="card-num"
          placeholder="PKR 3000.00"
          size="17"
          id="cno"
          minlength="19"
          maxlength="19"
        />
      </div>

      {/* =========================> TABS Content */}

      <div class="tab-content" id="pills-tabContent">
        {/* =========================>First TABS Content*/}

        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="card col-4 mt-5 mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            aspernatur placeat? Adipisci nihil voluptas nostrum aliquam amet
            facere est assumenda! Quas autem dignissimos tempore eligendi
            molestiae consequatur odio reiciendis illum.
          </div>
        </div>

        {/* =========================> Second TABS Content */}
        <div
          class="tab-pane fade d-flex justify-content-center"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div class="card col-4 mt-5 mx-auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">
                Lorem, ipsum dolor sit amet consectetur elit.
              </h5>
              <p class="card-text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ma.
              </p>
            </div>
          </div>
        </div>

        {/* =========================> Third TABS Content */}
        <div
          class="tab-pane fade"
          id="pills-jazzcash"
          role="tabpanel"
          aria-labelledby="pills-jazzcash-tab"
        >
          <div class="" style={{ marginTop: "-47%" }}>
            <div class="row d-flex justify-content-center">
              <div class="col-sm-6">
                <div class="card mx-auto" id="backColor">
                  <p class="heading">PAYMENT DETAILS</p>
                  <form class="card-details ">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/b/b4/JazzCash_logo.png"
                      width="64px"
                      height="60px"
                      style={{
                        display: "block",
                        marginLeft: "auto",
                        // marginRight:"auto",
                        marginTop: "-10%",
                      }}
                    />
                    <div class="form-group mb-0">
                      <p class="text-warning mb-0">Mobile Number</p>
                      <input
                        type="text"
                        name="card-num"
                        placeholder="+923022639133"
                        size="17"
                        minlength="13"
                        maxlength="13"
                        ref={JazzMobiNum}
                      />
                    </div>

                    <div class="form-group">
                      <p class="text-warning mb-0">CNIC (Last 6 digits)</p>
                      <input
                        type="text"
                        name="name"
                        placeholder="CNIC (Last 6 digits)"
                        size="6"
                        minlength="6"
                        maxlength="6"
                        ref={JazzCNIC}
                      />
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary mt-4"
                      onClick={JazzCashHandler}
                    >
                      <i class="fas fa-arrow-right px-3 py-2"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================> Fourth TABS Content */}
        <div
          class="tab-pane fade"
          id="pills-contact"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
        >
          <div class="" style={{ marginTop: "-47%" }}>
            <div class="row d-flex justify-content-center">
              <div class="col-sm-6">
                <div class="card mx-auto" id="backColor">
                  <p class="heading">PAYMENT DETAILS</p>
                  <div style={{ display: "flex", marginLeft: "auto" }}>
                    <img src="https://img.icons8.com/color/48/000000/visa.png" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                    <img src="https://img.icons8.com/color/48/000000/maestro.png" />
                  </div>

                  <form class="card-details ">
                    <div class="form-group mb-0">
                      <p class="text-warning mb-0">Card Number</p>
                      <input
                        type="text"
                        name="card-num"
                        placeholder="1234 5678 9012 3457"
                        size="17"
                        id="cno"
                        minlength="19"
                        maxlength="19"
                        ref={CreditCardNumber}
                      />
                    </div>

                    <div class="form-group">
                      <p class="text-warning mb-0">Cardholder's Name</p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        size="17"
                        ref={CreditCardHolder}
                      />
                    </div>
                    <div class="form-group pt-2">
                      <div class="row d-flex">
                        <div class="col-sm-3">
                          <p class="text-warning mb-0">Ex Month</p>
                          <input
                            type="text"
                            name="exp"
                            placeholder="MM"
                            size="2"
                            id="exp"
                            minlength="2"
                            maxlength="2"
                            ref={CreditMonth}
                          />
                        </div>
                        <div class="col-sm-3">
                          <label class="text-warning mb-0">Ex Year</label>
                          <input
                            type="text"
                            name="exp"
                            placeholder="YYYY"
                            size="4"
                            id="exp"
                            minlength="4"
                            maxlength="4"
                            ref={CreditYear}
                          />
                        </div>
                        <div class="col-sm-3">
                          <p class="text-warning mb-0">Cvv</p>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="&#9679;&#9679;&#9679;"
                            size="1"
                            minlength="3"
                            maxlength="3"
                            ref={CreditCvv}
                          />
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary mt-4"
                          onClick={CreditHandler}
                        >
                          <i class="fas fa-arrow-right px-3 py-2"></i>
                        </button>
                        {/* <div class="col-sm-5 pt-0">
                          </div> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

{
  /* <img src="https://img.icons8.com/color/48/000000/visa.png" />
<img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
<img src="https://img.icons8.com/color/48/000000/maestro.png" /> */
}
