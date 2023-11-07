import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Delete from './Delete'
import Modal from './Modal'

const UserRow = (props) => {

    const [Del, setDel] = useState(false);

    const [Edit, setEdit] = useState(false);

    const btnDelete = () => {
        setDel(true)
    }

    const btnEdit = () => {
        setEdit(true)
    }

    return (
        <>
            <tr className=' border-y border-1 py-60 text-xl  text-white'>
                <td className='py-5 text-lg text-white '>
                    {props.e.username}
                </td>

                <td>
                    {props.e.firstName}
                </td>

                <td>
                    {props.e.lastName}
                </td>
                <td>
                    {props.e.email}
                </td>
                <td>
                    {props.e.role}
                </td>
                <td >
                    <button onClick={btnDelete} className='bg-slate-400  text-2xl rounded-lg p-1 mx-4'> <RiDeleteBinLine /> </button>

                    <button onClick={btnEdit} className='bg-slate-400  text-2xl rounded-lg p-1' > <FiEdit /> </button>


                </td>
            </tr>

            {Del && <Delete id={props.e._id} name={props.e.username} setDel={setDel} delete={props.getuser} />}

            {Edit && <Modal getuser={props.fetchData} setmodal={setEdit} userdata={props.e} />}
        </>
    )
}

export default UserRow