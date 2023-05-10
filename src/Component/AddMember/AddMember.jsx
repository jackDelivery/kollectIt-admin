import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Url } from '../../Pages/Core';
import './AddMember.css';


export default function AddMember() {

    const name = useRef()
    const email = useRef()
    const password = useRef()

    function employe() {
        axios({
            method: "post",
            url: Url+"/auth/employe",
            data: {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
                Role: "Awaiting",
            }
        }).then((res) => {
            alert(res.data.message)
            name.current.value = ""
            email.current.value = ""
            password.current.value = ""
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    employe()
                }}>

                <div class="container">
                    <h1>Add Members</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />
                    <label for="psw-repeat"><b>Name</b></label>
                    <input type="text" placeholder="member Name" name="name" ref={name} />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" ref={email} />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={password} />

                    <hr />
                    <button type="submit" class="registerbtn">Register</button>
                </div>


            </form>
        </div>
    )
}
