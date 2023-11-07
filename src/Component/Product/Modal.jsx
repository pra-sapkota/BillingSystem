import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { catfetch } from '../../utils/FetchCategory'
// import { catfetch } from "../../utils/FetchCategory"
const Modal = (props) => {

    const clickHandle = (event) => {

        event.stopPropagation()
    }

    const [cat, setcat] = useState([])

    const [product, setProduct] = useState({

        name: "",
        price: "",
        description: "",
        status: "active",
        category: "",
    })

    useEffect(() => {
        if (props.prodata) {
            setProduct({
                name: props.prodata.name,
                price: props.prodata.price,
                description: props.prodata.description,
                status: props.prodata.status,
                category: props.prodata.category,


            })
        }

    }, [])

    useEffect(() => {
        if (cat.length > 0) {
            setProduct({ ...product, category: cat[0]._id })
        }
    }, [cat])

    useEffect(() => {
        const getcategory = async () => {
            const response = await catfetch();
            setcat(response.categories)
        }
        getcategory();
    }, [])

    const submithandle = async (e) => {
        e.preventDefault()
        try {
            if (props.prodata) {
                const responseRaw = await fetch(`http://127.0.0.1:8000/api/product/${props.prodata._id}`, {
                    method: "PATCH",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                });
                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setState(false)
                    // props.getproduct()
                    props.edit()
                    // toast.success(response.msg)
                } else {
                    // toast.error(response.msg)

                }
            } else {
                const responseRaw = await fetch('http://127.0.0.1:8000/api/product/create', {
                    method: "POST",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                });
                const response = await responseRaw.json();
                console.log(response)
                if (response.success) {
                    props.setState(false)
                    props.getproduct()
                    // toast.success(response.msg)
                } else {
                    // toast.error(response.msg)

                }
            }


        } catch (error) {


        }

    }

    return (
        <div onClick={() => { props.setState(false) }} className={` text-white duration-300 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center `}>
            <form onClick={clickHandle} className='w-80 px-3 py-8 bg-white rounded-md border border-teal-950 relative flex flex-col justify-start gap-3 '>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Name</label>
                    <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="input " type='text' placeholder='Enter Username' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Price</label>
                    <input value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="input " type='text' placeholder='Enter FirstName' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Description</label>
                    <input value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="input " type='text' placeholder='Enter LastName' />
                </div>
                <div className='flex justify-start flex-col gap-2'>
                    <label className='label'>Status</label>
                    <input value={product.status} onChange={(e) => setProduct({ ...product, status: e.target.value })} className="input " type='text' placeholder='Enter Password' />
                </div>
                <div className='flex justify-start flex-col gap-2 text-black border border-black outline-none  font-bold'>
                    <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} >
                        {
                            cat.map((e) => {
                                return (
                                    <option value={e._id}>{e.name}</option>
                                )
                            })

                        }

                    </select>
                </div>
                <div className='flex justify-start flex-col gap-2 mt-2'>
                    <button className='bg- bg-teal-900 p-3  rounded-lg w-full' onClick={submithandle} >Save</button>
                </div>
                <button onClick={() => { props.setState(false) }} className=' bg-teal-900 absolute top-2 right-2 text-xl rounded-lg '><AiOutlineCloseCircle /></button>
            </form>
        </div>
    )
}

export default Modal