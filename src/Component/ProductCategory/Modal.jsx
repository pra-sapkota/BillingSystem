import React, { useState, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import toast from 'react-hot-toast';

const Modal = (props) => {

    const clickHandle = (event) => {

        event.stopPropagation()
    }


    const [category, setCategory] = useState({
        name: "",
        description: "",
        status: "active"
    })

    useEffect(() => {
        if (props.catdata) {
            setCategory({
                name: props.catdata.name,
                description: props.catdata.description,
                status: props.catdata.status,


            })
        }

    }, [])

    const submithandle = async (e) => {
        e.preventDefault()
        try {
            if (props.catdata) {
                const responseRaw = await fetch(`http://127.0.0.1:8000/api/category/${props.catdata._id}`, {
                    method: "PATCH",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(category)
                });
                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setState(false)
                    // props.getcat()
                    props.Edit()

                    toast.success(response.msg)
                } else {
                    toast.error(response.msg)

                }
            } else {
                const responseRaw = await fetch('http://127.0.0.1:8000/api/category/create', {
                    method: "POST",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(category)
                });
                console.log("hello")

                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setState(false)
                    props.getcat()
                    toast.success(response.msg)
                } else {
                    toast.error(response.msg)

                }
            }


        } catch (error) {


        }


    }

    return (
        <div onClick={() => { props.setState(false) }} className={` text-white duration-300 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center `}>
            <div onClick={clickHandle} className='w-80 px-3 py-8 bg-white rounded-md border border-teal-950 relative flex flex-col justify-start gap-3 '>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Category Name</label>
                    <input value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} className="input " type='text' placeholder='Enter Category' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Description</label>
                    <input value={category.description} onChange={(e) => setCategory({ ...category, description: e.target.value })} className="input " type='text' placeholder='Enter Description' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>status</label>
                    <input value={category.status} onChange={(e) => setCategory({ ...category, status: e.target.value })} className="input " type='text' placeholder='Enter Description' />
                </div>
                {/* <div className='flex justify-start flex-col gap-2 text-black border border-black outline-none  font-bold'>
                    <select value={category.role} onChange={(e) => setCategory({ ...category, status: e.target.value })} >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>

                    </select>
                </div> */}

                <div className='flex justify-start flex-col gap-2 mt-2'>
                    <button className='bg- bg-teal-900 p-3  rounded-lg w-full ' onClick={submithandle}>Save</button>
                </div>
                <button onClick={() => { props.setState(false) }} className=' bg-teal-900 absolute top-2 right-2 text-xl rounded-lg '><AiOutlineCloseCircle /></button>
            </div>
        </div>
    )


}

export default Modal