import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdAdd } from 'react-icons/md'
import Modal from './Modal'
import UserRow from './UserRow';


const User = (props) => {

    const [Data, setData] = useState([]);

    const [modal, setmodal] = useState(false);

    const btnClick = () => {
        console.log(modal)
        setmodal(!modal);
    }

    const fetchData = async (e) => {

        try {
            const responseRaw = await fetch('http://127.0.0.1:8000/api/user/all',
                {
                    method: "GET",
                    headers: {
                        "auth_token": localStorage.getItem("token"),
                    },
                })
            const response = await responseRaw.json();

            setData(response.users)
        } catch (error) {

        }

    }

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div className='flex flex-col  items-center  w-full'>
            <div className='flex  justify-between items-center max-w-[900px] w-full mx-auto '>
                <div className='font-bold text-xl '>User</div>
                <button onClick={btnClick} className='font-bold   bg-teal-900 m-5 px-5 py-3 flex items-center gap-2 rounded-md text-white '>

                    <MdAdd />
                    <button  >Add</button>
                </button>
                {modal && (
                    <Modal getuser={fetchData} setmodal={setmodal} />
                )}

            </div>
            <div className=' max-w-[900px] w-full bg-teal-700 rounded-md '>
                <table className='w-full   m-auto  '>
                    <thead >
                        <tr className=' text-white font-bold '>
                            <td className='p-5'>
                                Username
                            </td>

                            <td>
                                Firstname
                            </td>
                            <td>
                                Lastname
                            </td>
                            <td>
                                Email
                            </td>
                            <td>
                                Role
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Data.map((e) => {
                                return (
                                    <UserRow getuser={fetchData} e={e} />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default User