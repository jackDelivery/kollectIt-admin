import React, { useEffect, useState, useContext } from "react";
import { MDBDataTableV5 } from "mdbreact";
import "./AddPayment.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";

export default function AddPayment() {
  const UserCredentials = useContext(StoreContext);

  // console.log(allData, "allData");

  return (
    <div>
      <div className="text-center p-3 bg-warning col-3">Amount:3000$</div>
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
            Home
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
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Card
          </a>
        </li>
      </ul>

      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          aspernatur placeat? Adipisci nihil voluptas nostrum aliquam amet
          facere est assumenda! Quas autem dignissimos tempore eligendi
          molestiae consequatur odio reiciendis illum.
        </div>
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
                Improve your front-end skills by building projects
              </h5>
              <p class="card-text">
                Scan the QR code to visit Frontend Mentor and take your coding
                skills to the next level
              </p>
            </div>
          </div>
        </div>
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
                  <form class="card-details ">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
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
                      <p class="text-warning mb-0">Card Number</p>
                      <input
                        type="text"
                        name="card-num"
                        placeholder="1234 5678 9012 3457"
                        size="17"
                        id="cno"
                        minlength="19"
                        maxlength="19"
                      />
                    </div>

                    <div class="form-group">
                      <p class="text-warning mb-0">Cardholder's Name</p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        size="17"
                      />
                    </div>
                    <div class="form-group pt-2">
                      <div class="row d-flex">
                        <div class="col-sm-4">
                          <p class="text-warning mb-0">Expiration</p>
                          <input
                            type="text"
                            name="exp"
                            placeholder="MM/YYYY"
                            size="7"
                            id="exp"
                            minlength="7"
                            maxlength="7"
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
                          />
                        </div>
                        <div class="col-sm-5 pt-0">
                          <button type="button" class="btn btn-primary mt-4">
                            <i class="fas fa-arrow-right px-3 py-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
