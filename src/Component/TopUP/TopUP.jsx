import React, { useEffect, useState, useContext, useRef } from "react";
import "./TopUP.css";
import axios from "axios";
import { Url } from "../../Pages/Core";
import StoreContext from "../../ContextApi";
import CryptoJS from "crypto-js";

export default function TopUP() {
  const UserCredentials = useContext(StoreContext).UserData;
  const [OrderId, setOrderId] = useState("");
  const [CreditBalance, setCreditBalance] = useState("");
  const [PaymentAmount, setPaymentAmount] = useState("");
  const [netAmount, setnetAmount] = useState(0.0);
  const [FunAuthToken, setFunAuthToken] = useState("");

  // let = useRef()
  // let = useRef()
  console.log(UserCredentials, "PaymentAmount");
  let JazzMobiNum = useRef();
  let JazzCNIC = useRef();

  // let CreditCardNumber = useRef();
  // let CreditCardHolder = useRef();
  // let CreditMonth = useRef();
  // let CreditYear = useRef();
  // let CreditCvv = useRef();
  function JazzCashHandler(e) {
    // e.preventdefault();
    let body = {
      JazzMobiNum: JazzMobiNum.current.value,
      JazzCNIC: JazzCNIC.current.value,
    };
    console.log(body, "Jazz Cash");
  }

  // function CreditHandler(e) {
  //   // e.preventdefault();
  //   let body = {
  //     CreditCardNumber: CreditCardNumber.current.value,
  //     CreditCardHolder: CreditCardHolder.current.value,
  //     CreditMonth: CreditMonth.current.value,
  //     CreditYear: CreditYear.current.value,
  //     CreditCvv: CreditCvv.current.value,
  //   };
  //   console.log(body, "Credit Card");
  // }

  useEffect(() => {
    // setreloadData(false)

    axios({
      method: "post",
      url: Url + "/filteredQuota",
      data: {
        filter: {
          BelongsTo: UserCredentials._id,
        },
      },
    }).then((response) => {
      setCreditBalance(response.data);
      // console.log(response.data, "=================>allData");
    });
  }, []);

  useEffect(() => {
    getRandomNumber(); // Random Number Generate
   // percentage(2.5, 10000); // Calculate Percentage
    PayOff(); // auth_token Generate
  }, []);

  function getRandomNumber() {
    let Letters = "0123456789ABCDEF";
    let RandomNum = "9";
    for (let i = 0; i < 8; i++) {
      RandomNum += Letters[Math.floor(Math.random() * 16)];
    }
    setOrderId("Order-1234");
  }

  function percentage(percent, amount) {
    let netAmnt =  parseFloat(amount)/(1-(parseFloat(percent) / 100)) ;
    console.log("NetAmount as calculated",netAmnt,percent, amount);
    setnetAmount(netAmnt);
  }
  const handleBill= async()=>{
    percentage(2.5,PaymentAmount)

  }
  async function  generateBilll(data){
    let today= Date.now();

    axios({
        method: "post",
        url: Url + "/billPayment",
        data: {
          ClientId: data.OrderId ,
          ClientObjectId: "Paid",
          ClientName:"",
          Due_date:today.toDateString(),
          Aamount_within_dueDate:0,
          Amount_after_dueDate:0,
          Billing_month:today.toDateString()
        }
    }).then((res) => {
        console.log("Response from bill Update",res);
       alert("Your payment is successfully received and recorded in our system");
    }).catch((err) => {
        console.log("zerror in bill",err);
    })
}

  function PayOff() {
    axios({
      url: "https://testcheckout.kuickpay.com/api/KPToken",
      method: "post",
      data: {
        InstitutionID: "01234",
        KuickpaySecuredKey: "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI=",
      },
    }).then((res) => {
      setFunAuthToken(res.data);
      // console.log(res.data, "auth Token response ");
      // getRandomNumber();
      // CheckOutForm(res.data);
    });
  }

  // function CheckOutForm(auth) {
  //   // console.log(OrderId)

  //   const concatenatedString =
  //     "01234" +
  //     OrderId +
  //     "10000" +
  //     "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI=";
  //   const md5Hash = CryptoJS.MD5(concatenatedString);
  //   const md5Hex = md5Hash.toString(CryptoJS.enc.Hex);

  //   // console.log(md5Hex)

  //   var bodyFormData = new FormData();
  //   bodyFormData.append("OrderID", OrderId);
  //   bodyFormData.append("MerchantName", "Raza");
  //   bodyFormData.append("Amount", "10000");
  //   bodyFormData.append("TransactionDescription", "Example of Content");
  //   bodyFormData.append("CustomerMobileNumber", "+923022639133");
  //   bodyFormData.append("CustomerEmail", "faizeraza2468@gmail.com");
  //   bodyFormData.append("SuccessUrl", "https://tecstik.com");
  //   bodyFormData.append("FailureUrl", "https://kollectit.netlify.app/");
  //   bodyFormData.append("OrderDate", new Date().toDateString());
  //   bodyFormData.append("CheckoutUrl", "https://testcheckout.kuickpay.com/");
  //   bodyFormData.append("TOKEN", auth.auth_token);
  //   bodyFormData.append("amount", "https://whatsapp.com");
  //   bodyFormData.append("GrossAmount", "9000");
  //   bodyFormData.append("TaxAmount", "1000");
  //   bodyFormData.append("Discount", "0");
  //   bodyFormData.append("InstitutionID", "01234");
  //   bodyFormData.append("Signature", md5Hex);
  //   axios({
  //     method: "post",
  //     url: "https://testcheckout.kuickpay.com/api/Redirection",
  //     data: bodyFormData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  // const handlePaymentSubmit = async (e) => {
  //   e.preventDefault();

  //   // Construct the form data
  //   var bodyFormData = new FormData();

  //   const concatenatedString =
  //     "01234" +
  //     OrderId +
  //     "10000" +
  //     "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI=";
  //   const md5Hash = CryptoJS.MD5(concatenatedString);
  //   const md5Hex = md5Hash.toString(CryptoJS.enc.Hex);

  //   console.log(md5Hex);

  //   bodyFormData.append("OrderID", OrderId);
  //   bodyFormData.append("MerchantName", "Raza");
  //   bodyFormData.append("Amount", "10000");
  //   bodyFormData.append("TransactionDescription", "Example of Content");
  //   bodyFormData.append("CustomerMobileNumber", "+923022639133");
  //   bodyFormData.append("CustomerEmail", "faizeraza2468@gmail.com");
  //   bodyFormData.append("SuccessUrl", "https://tecstik.com");
  //   bodyFormData.append("FailureUrl", "https://kollectit.netlify.app/");
  //   bodyFormData.append("OrderDate", new Date().toDateString());
  //   bodyFormData.append("CheckoutUrl", "https://testcheckout.kuickpay.com/");
  //   // bodyFormData.append("TOKEN", auth.auth_token);
  //   bodyFormData.append("TOKEN", FunAuthToken.auth_token);
  //   bodyFormData.append("amount", "https://whatsapp.com");
  //   bodyFormData.append("GrossAmount", "9000");
  //   bodyFormData.append("TaxAmount", "1000");
  //   bodyFormData.append("Discount", "0");
  //   bodyFormData.append("InstitutionID", "01234");
  //   bodyFormData.append("Signature", md5Hex);
  //   // Add other payment-related data to formData...

  //   try {
  //     // Send the POST request to Kuickpay Checkout
  //     const response = await fetch(
  //       "https://testcheckout.kuickpay.com/api/Redirection",
  //       {
  //         method: "POST",
  //         body: bodyFormData,
  //       }
  //     );

  //     // Handle the response, e.g., display it in an iframe
  //     if (response.ok) {
  //       const iframeContent = await response.text();
  //       // Display the response in the iframe
  //       // document.getElementById("paymentIframe").srcdoc = iframeContent;
  //     } else {
  //       // Handle error responses...
  //     }
  //   } catch (error) {
  //     // Handle network errors...
  //   }
  // };

  // function PayOff() {}

  return (
    <div>
      <div class="col-12 mb-4">
        <div class="row box-right">
          <div class="col-md-4 ps-0 ">
            <p class="ps-3 textmuted fw-bold h6 mb-0">Your Balance</p>

            <p class="h1 fw-bold d-flex">
              <span class=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1"></span>
              {CreditBalance[0] ? (
                <>{CreditBalance[0].CreditBalance}</>
              ) : (
                <>00</>
              )}
              <span class="textmuted">.00</span>
            </p>
            <p class="ms-3 px-2 bg-green">+10% since last month</p>
          </div>

          {/* <form onSubmit={handlePaymentSubmit}>
            <input
              type="text"
              placeholder="Auth Token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
            <button type="submit">Submit Payment</button>
            <iframe
              id="paymentIframe"
              title="Payment Gateway Response"
            ></iframe>
          </form> */}

          <div class="col-md-4">
            <p class="text-warning mb-0">Payment Amount</p>
            <input
              type="text"
              placeholder="Your Amount"
              // ref={AdminAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <div class="col-md-4 mt-2">
            <button type="button" class="btn btn-primary mt-4" onClick={handleBill}>
             get Bill
            </button>
          </div>
        </div>
      </div>

      <button type="button" class="btn btn-primary mt-4" onClick={PayOff}>
        Pay Off
      </button>

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
            Credit or Debit Card
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
          // placeholder="PKR 3000.00"
          placeholder="Your Amount"
          size="17"
          id="cno"
          minlength="19"
          maxlength="19"
        />
      </div>

      {/* {console.log(OrderId, (100 * 2.5) / 1000, "Order====Id")}
      {console.log(FunAuthToken.auth_token, "Order====Id")} */}
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
            <form
              method="post"
              action="https://testcheckout.kuickpay.com/api/Redirection"
              style={{ textAlign: "start", fontWeight: "unset" }}
            >
              <input type="hidden" name="InstitutionID" Value="01234" />
              <input type="hidden" name="OrderID" Value={OrderId} />
              <label>Name :</label>
              <input
                type="text"
                name="MerchantName"
                Value={"TecStik"}
                className="bg-white"
              />
              <input
                type="hidden"
                name="TransactionDescription"
                Value="Invoice"
                className="bg-white"
              />
              <label>CustomerMobileNumber :</label>
              <input
                type="text"
                name="CustomerMobileNumber"
                Value={UserCredentials.loginId}
                className="bg-white"
              />
              <label>CustomerEmail :</label>
              <input
                type="text"
                name="CustomerEmail"
                Value={UserCredentials.employeeEmail}
                className="bg-white"
              />
              <input
                type="hidden"
                name="SuccessUrl"
                Value="http://localhost:3000/dashboard"
              />
              <input
                type="hidden"
                name="FailureUrl"
                Value="https://kollectit.netlify.app/"
              />
              <input
                type="hidden"
                name="OrderDate"
                Value={new Date().toDateString()}
              />
              {/* <!-- <input type="text" name="OrderDate" Value="2022-03-16"> --> */}
              <input
                type="hidden"
                name="CheckoutUrl"
                Value="http://localhost:82/kuickpaycheckout.php"
              />
              <input
                type="hidden"
                name="Token"
                Value={FunAuthToken.auth_token}
              />
              <label>GrossAmount :</label>
              <input
                type="text"
                name="GrossAmount"
                Value="10000"
                className="bg-white"
              />

              <label>TaxAmount :</label>
              <input
                type="text"
                name="TaxAmount"
                Value="2.5"
                className="bg-white"
              />

              <label>Amount :</label>
              <input
                type="text"
                name="Amount"
                Value={netAmount}
                className="bg-white"
              />
              <input type="hidden" name="Discount" Value="1" />
              <input type="hidden" name="PaymentMethod" Value="0" />
              <input
                type="hidden"
                name="Signature"
                value={CryptoJS.MD5(
                  "01234" +
                    OrderId +
                    netAmount +
                    "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI="
                ).toString(CryptoJS.enc.Hex)}
              />
              {/* <input type="text" name="NIC" Value="" /> */}
              {/* <input type="text" name="AmountFeeCalculated" Value="<?php echo $AmountFeeCalculated; ?>" /> */}
              {/* <input type="text" name="Signature" Value="<?php echo $Signature; ?>" /> */}
              <input type="submit" value="PAY NOW" />
            </form>
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
        {/* <div
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
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* <form
        action="https://testcheckout.kuickpay.com/api/Redirection"
        method="POST"
      >
        <input type="" name="OrderID" value={OrderId} />
        <input type="" name="MerchantName" value="Raza" />
        <input type="" name="Amount" value="10000" />
        <input
          type=""
          name="TransactionDescription"
          value="short description"
        />
        <input type="" name="CustomerMobileNumber" value="03022639133" />
        <input type="" name="CustomerEmail" value="faizeraza2468@gmail.com" />
        <input type="" name="SuccessUrl" value="https://tecstik.com" />
        <input
          type=""
          name="FailureUrl"
          value="https://kollectit.netlify.app/"
        />
        <input type="" name="OrderDate" value={new Date().toDateString()} />
        <input type="" name="CheckoutUrl" value="https://whatsapp.com" />
        <input
          type=""
          name="TOKEN"
          value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNCIsImp0aSI6IjBmYWU4MTNhLTM2ZmYtNDViOC1iMzJlLTE4MjljZDRkMDQwOSIsImlhdCI6MTY5NDA3NjQ2MywiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjAxMjM0IiwibmJmIjoxNjk0MDc2NDYzLCJleHAiOjE2OTQwNzgyNjMsImlzcyI6IktQQ2hlY2tvdXRBUEkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAvIn0.HnkiMlY7yPgHq_t3zvTfDRHuMu1P7xgkEqi3xCPRxnM"
        />
        <input type="" name="GrossAmount" value="9000" />
        <input type="" name="TaxAmount" value="1000" />
        <input type="" name="Discount" value="0" />
        <input type="" name="InstitutionID" value="01234" />
        <input
          type=""
          name="Signature"
          value={CryptoJS.MD5(
            "01234" +
              OrderId +
              "10000" +
              "xWX+A8qbYkLgHf3e/pu6PZiycOGc0C/YXOr3XislvxI="
          ).toString(CryptoJS.enc.Hex)}
        />
        <input type="submit" value="Proceed to Payment" />

        <iframe id="paymentIframe" title="Payment Gateway Response"></iframe>
      </form> */}
    </div>
  );
}

{
  /* <img src="https://img.icons8.com/color/48/000000/visa.png" />
<img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
<img src="https://img.icons8.com/color/48/000000/maestro.png" /> */
}
