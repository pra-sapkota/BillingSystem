import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Delete from './Delete'
import Modal from './Modal'

const ProductRow = (props) => {
    const [Del, setDel] = useState("")

    const [Edit, setEdit] = useState("")

    const btnDel = () => {
        setDel(!Del)
    }

    const btnEdit = () => {
        setEdit(!Edit)
    }


    return (
        <>
            <tr className=' border-y border-1 py-60 text-xl  text-white'>
                <td className='py-5 text-lg text-white '>
                    {props.e.name}
                </td>
                <td>
                    {props.e.price}
                </td>
                <td>
                    {props.e.description}
                </td>

                <td>
                    {props.e.category.name}
                </td>

                <td>
                    {props.e.status}
                </td>
                <td >
                    <button onClick={btnDel} className='bg-slate-400  text-2xl rounded-lg p-1 mx-4'> <RiDeleteBinLine /> </button>
                    <button onClick={btnEdit} className='bg-slate-400  text-2xl rounded-lg p-1' > <FiEdit /> </button>

                </td>
            </tr>

            {Del && <Delete id={props.e._id} name={props.e.name} setDel={setDel} delete={props.getproduct} />}

            {Edit && <Modal setState={setEdit} edit={props.getproduct} prodata={props.e} />}

        </>
    )
}

export default ProductRow