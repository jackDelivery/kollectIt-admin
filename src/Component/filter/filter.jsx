import { React, useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { Input } from "antd";
import moment from "moment";
import "./filter.css";

export default function Filter({ data }) {
  let StartDate = useRef();
  let EndDate = useRef();
  let refData = useRef();
  let issuerData = useRef();

  let datafilter = data.allData;
  //   console.log(datafilter.allData);
  //   data.setfilterItem(datafilter)

  //   console.log(
  //     moment(datafilter.createdOn).format("MMM Do YY"),
  //     "value.date >= EndDate && value.date <= StartDate"
  //   );

  function handler() {
    let Start_Date = StartDate.current.value;
    let End_Date = EndDate.current.value;
    // let filterendref = refData.current.input.value;
    // let filterendissuer = issuerData.current.input.value;
    console.log(moment(Start_Date).format("MMM Do YY"), "Start_Date");
    let filteration = {
      Start_Date: Start_Date,
      Start_Date: Start_Date,
      //   filterendref: filterendref,
      //   filterendissuer: filterendissuer,
    };

    // console.log(filteration, "filteration");

    let filtertion = datafilter.filter((value) => {
      if (
        moment(value.createdOn).format("MMM Do YY") >=
          moment(Start_Date).format("MMM Do YY") && // input
        moment(value.createdOn).format("MMM Do YY") <=
          moment(End_Date).format("MMM Do YY")
      ) {
        return value;
      }
    });
    console.log(filteration,"filteration"); //
    data.setfilterItem(filtertion);
  }

  return (
    <div>
      <div class="d-flex">
        <div class="p-2 w-100"></div>
        <div class="flex-shrink-1">
          <a
            class="btn btn-primary"
            data-mdb-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            id="filter-button"
            aria-controls="collapseExample"
            style={{
              background: "#427D8F",
              fontSize: 15,
              marginTop: "-3%",
              padding: 10,
            }}
          >
            Filter
          </a>
        </div>
      </div>

      {/* <!-- Collapsed content --> */}

      <div class="collapse mt-3" id="collapseExample">
        <div>
          <div class="row mb-5 mx-5" id="filterColor">
            <div class="col-md-3">
              <div class="col-example z-depth-4 flex-center">
                <p>
                  <label class="form-label text-white">
                    Start Date<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="End of Data"
                    ref={StartDate}
                  />
                </p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-example z-depth-4 flex-center">
                <p>
                  <label class="form-label text-white">
                    End Date<span class="text-danger"> *</span>
                  </label>
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    ref={EndDate}
                  />
                </p>
              </div>
            </div>

            {/* <div class="col-md-3">
              <div class="col-example z-depth-5 flex-center">
                <p class="white-text">
                  <label class="form-label text-white">
                    Number<span class="text-danger"> *</span>
                  </label>
                  <Input placeholder=" Refrence Number" ref={refData} />
                </p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-example   flex-center">
                <p class="white-text">
                  <label class="form-label text-white">
                    Email<span class="text-danger"> *</span>
                  </label>
                  <Input placeholder=" Issuer Number" ref={issuerData} />
                </p>
              </div>
            </div> */}
            <div class="d-flex">
              <div class="p-2 w-100">s
              
                <div class="  flex-center">
                  <p class="white-text">
                    <button
                      id="search-button"
                      type="button"
                      onClick={handler}
                      class="btn btn-secondary"
                    >
                      <i class="fas fa-search"></i> Search
                    </button>
                  </p>
              {/* <div class="col-md-2"> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
