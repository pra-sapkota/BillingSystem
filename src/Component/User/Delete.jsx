import React from 'react'


const Delete = (props) => {

    const deletehandler = async (e) => {


        try {
            const responseRaw = await fetch(`http://127.0.0.1:8000/api/user/${props.id}`, {
                method: "DELETE",
                headers: {
                    "auth_token": localStorage.getItem("token"),
                },

            });
            const response = await responseRaw.json();
            console.log(response)
            if (response.success) {
                props.delete()
            }

        } catch (error) {

        }
    }
    return (
        <div onClick={() => { props.setDel(false) }} className={` duration-300 fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex justify-center items-center `}>
            <div className='w-50 px-3 py-8 bg-teal-900 text-white rounded-md  relative flex flex-col justify-start gap-5'>
                Are you sure you want to delete {props.name}
                <div className='flex justify-around'>
                    <button onClick={deletehandler} className='bg-slate-400 p-3  rounded-lg w-20'>Yes</button>
                    <button onClick={() => { props.setDel(false) }} className='bg-slate-400 p-3  rounded-lg w-20'>No</button>
                </div>
            </div>


        </div>
    )
}

export default Delete