import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import Modal from './Modal'
import ProRow from './ProRow'




const ProCategory = (props) => {

    const [State, setState] = useState(false);

    const [categorydata, setCategorydata] = useState([]);

    const btnAdd = () => {
        setState(!State);
        console.log(State)
    }

    const fetchrawdata = async (e) => {
        try {
            const responseRaw = await fetch('http://localhost:8000/api/category/all', {
                method: 'GET',
                headers: {
                    'auth_token': localStorage.getItem("token")
                }
            });
            const response = await responseRaw.json();
            console.log(response)
            setCategorydata(response.categories);


        } catch (error) {

        }


    }

    useEffect(() => {
        fetchrawdata();
    }, [])

    return (
        <div className='flex flex-col  items-center  w-full overflow-y-auto h-[calc(100vh-70px)] '>
            <div className='flex  justify-between items-center max-w-[900px] w-full mx-auto '>
                <div className='font-bold text-xl '>Product Category</div>
                <button onClick={btnAdd} className='font-bold text-white bg-teal-900 m-5 px-5 py-3 flex items-center gap-2 rounded-md '>
                    <MdAdd />
                    <button >Add</button>
                </button>

                {State && (
                    <Modal setState={setState} getcat={fetchrawdata} />

                )}

            </div>
            <div className=' max-w-[900px] w-full bg-teal-700 rounded-md '>
                <table className='w-full   m-auto  '>
                    <thead >
                        <tr className=' text-white font-bold '>
                            <td className='p-5'>
                                sn
                            </td>
                            <td>
                                Category
                            </td>

                            <td>
                                Description
                            </td>
                            <td>
                                Status
                            </td>
                            <td>
                                Action
                            </td>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorydata.map((e, index) => {
                                return (

                                    <ProRow e={e} index={index} getcat={fetchrawdata} />


                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default ProCategory