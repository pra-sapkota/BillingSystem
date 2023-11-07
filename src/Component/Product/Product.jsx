import React, { useState, useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import Modal from './Modal'
import ProductRow from './ProductRow'



const Product = (props) => {

    const [Product, setProduct] = useState([])

    const [State, setState] = useState(false);

    const btnAdd = () => {
        setState(!State);
        console.log(State)
    }

    const fetchData = async (e) => {

        try {
            const responseRaw = await fetch('http://127.0.0.1:8000/api/product/all',
                {
                    method: "GET",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                    },
                })
            const response = await responseRaw.json();

            // setProduct(response.product)
            setProduct(response.products)
            console.log(response)


        } catch (error) {

        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(Product)
    return (

        <div className='flex flex-col  items-center  w-full'>
            <div className='flex  justify-between items-center max-w-[900px] w-full mx-auto '>
                <div className='font-bold text-xl '>Product</div>
                <button onClick={btnAdd} className='font-bold text-white bg-teal-900 m-5 px-5 py-3 flex items-center gap-2 rounded-md '>
                    <MdAdd />
                    <button >Add</button>
                </button>
                {State && (
                    <Modal setState={setState} getproduct={fetchData} />

                )}

            </div>
            <div className=' max-w-[900px] w-full bg-teal-700 rounded-md '>
                <table className='w-full m-auto'  >
                    <thead>
                        <tr className=' text-white font-bold '>
                            <td className='p-5'>
                                Product Name
                            </td>
                            <td>
                                Price
                            </td>
                            <td>
                                Description
                            </td>
                            <td>
                                Category
                            </td>

                            <td>
                                Status
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Product.map((e) => {
                                return (
                                    <ProductRow getproduct={fetchData} e={e} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product