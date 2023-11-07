import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import Modal from './Modal'
import Delete from './Delete'

const ProRow = (props) => {

    const [delPro, setDelPro] = useState(false)

    const [editPro, setEditPro] = useState(false)

    const btnDel = () => {
        setDelPro(!delPro)
    }
    const btnEdit = () => {
        setEditPro(!editPro)
    }

    return (
        <>
            <tr className=' border-y border-1 py-60 text-xl  text-white'>
                <td className='py-5 text-lg text-white '>
                    {props.index + 1}

                </td>
                <td>
                    {props.e.name}
                </td>
                <td>
                    {props.e.description}
                </td>
                <td>
                    {props.e.status}
                </td>
                <td >
                    <button onClick={btnDel} className='bg-slate-400  text-2xl rounded-lg p-1 mx-4'> <RiDeleteBinLine /> </button>
                    <button onClick={btnEdit} className='bg-slate-400  text-2xl rounded-lg p-1' > <FiEdit /> </button>
                </td>
            </tr>

            {delPro && <Delete id={props.e._id} name={props.e.name} setDelPro={setDelPro} delete={props.getcat} />}

            {editPro && <Modal setState={setEditPro} Edit={props.getcat} catdata={props.e} />}
        </>

    )
}

export default ProRow