import React, { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import toast from 'react-hot-toast';

const Modal = (props) => {

    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        role: "admin"
    })
    console.log(user)

    useEffect(() => {
        if (props.userdata) {
            setUser({
                username: props.userdata.username,
                firstName: props.userdata.firstName,
                lastName: props.userdata.lastName,
                password: props.userdata.password,
                email: props.userdata.email,
                role: props.userdata.role,

            })
        }

    }, [])

    const submithandle = async (e) => {
        e.preventDefault()
        try {
            if (props.userdata) {
                const responseRaw = await fetch(`http://127.0.0.1:8000/api/user/${props.userdata._id}`, {
                    method: "PATCH",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setmodal(false)
                    props.getuser()
                    toast.success(response.msg)
                } else {
                    toast.error(response.msg)

                }
            } else {
                const responseRaw = await fetch('http://127.0.0.1:8000/api/user/register', {
                    method: "POST",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setmodal(false)
                    props.getuser()
                    toast.success(response.msg)
                } else {
                    toast.error(response.msg)

                }
            }
        } catch (error) {


        }

    }

    const clickHandle = (event) => {
        event.stopPropagation()
    }
    return (
        <div onClick={() => { props.setmodal(false) }} className={` text-white duration-300 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center `}>
            <form onClick={clickHandle} className='w-80 px-3 py-8 bg-white rounded-md border border-teal-950 relative flex flex-col justify-start gap-3 '>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Username</label>
                    <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="input " type='text' placeholder='Enter Username' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Firstname</label>
                    <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} className="input " type='text' placeholder='Enter FirstName' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Lastname</label>
                    <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} className="input " type='text' placeholder='Enter LastName' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Password</label>
                    <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="input " type='password' placeholder='Enter Password' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Email</label>
                    <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="input " type='email' placeholder='Enter Password' />
                </div>
                <div className='flex justify-start flex-col gap-2 text-black border border-black outline-none  font-bold'>
                    <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="editor">Editor</option>
                    </select>
                </div>

                <div className='flex justify-start flex-col gap-2 mt-2'>
                    <button className='bg- bg-teal-900 p-3  rounded-lg w-full' onClick={submithandle} >Save</button>
                </div>
                <button onClick={() => { props.setmodal(false) }} className=' bg-teal-900 absolute top-2 right-2 text-xl rounded-lg '><AiOutlineCloseCircle /></button>
            </form>
        </div>
    )
}

export default Modal