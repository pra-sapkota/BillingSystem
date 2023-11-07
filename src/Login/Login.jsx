import React, { useEffect, useState } from 'react'
import { PiTruckDuotone } from 'react-icons/pi';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {

    const Navigate = useNavigate();

    const [Login, setLogin] = useState("");
    const [Pass, setPass] = useState("");

    const submithandle = async (e) => {
        e.preventDefault();
        try {
            const responseRaw = await fetch('http://127.0.0.1:8000/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({ username: Login, password: Pass })
            });
            const response = await responseRaw.json();
            console.log(response)

            if (response.success) {
                localStorage.setItem("token", response.auth_token);
                toast.success(response.msg)

                window.location.href = "/dashboard";
            } else {
                toast.error(response.msg)

            }
        } catch (error) {

        }



        // if (Login == "admin" && Pass == "admin") {
        //     alert("Welcome User");


        //     // localStorage.setItem("userid, result[0].id");
        //     // Navigate("/dashboard");

        // }

        // else {
        //     alert("Invalid")

        // }




    }



    return (
        <div className=' md:flex md:flex-row h-screen w-screen flex justify-center items-center flex-col gap-20  bg-teal-900'>

            <img className=' flex justify-start max-w-[200px] w-full md:max-w-[400px] md:w-full ' src='https://youthed.org.za/wp-content/uploads/2022/10/login-users.png' alt='graphic' />



            <form className='max-w-[400px] w-full  flex justify-center flex-col bg-white p-4 rounded-sm'>

                <h1 className='LogLabel text-center text-2xl'>Login</h1>

                <div className='flex flex-col justify-start'>
                    <label className="LogLabel text-start">Username</label>

                    <input
                        className='LogInput placeholder:'
                        type='text'
                        placeholder='Enter Username'
                        value={Login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>


                <div className='flex flex-col justify-start'>
                    <label className='LogLabel text-start'>Password</label>

                    <input
                        className=' LogInput '
                        type='password'
                        placeholder='Enter Password'
                        value={Pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>

                <button className='bg-teal-900 mt-4 p-3 w-full text-xl text-white rounded-sm' onClick={submithandle}>Login</button>




            </form>
        </div>
    )
}

export default Login