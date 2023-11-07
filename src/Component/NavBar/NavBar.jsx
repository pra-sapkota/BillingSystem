import React, { useContext } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Context } from '../../App'

const NavBar = () => {

    const data = useContext(Context)

    const btnHandler = () => {
        data.setOpenSideBar(!data.openSideBar)
    }
    return (
        <div className='bg-teal-500 h-14 flex justify-between items-center text-xl'>

            <button onClick={btnHandler} className='text-xl block sm:hidden  p-2'>
                < RxHamburgerMenu />
            </button>

            <div className='m-6 text-white'>Billing Software</div>

            {/* <div className='m-6'>Profile</div> */}
            <div><img src="https://as2.ftcdn.net/v2/jpg/02/87/38/71/1000_F_287387149_ESu1yKMaeeG8XU6KrPaFXZuaiAkpP9DT.jpg" alt="" className='rounded-full w-10 mx-4 ' /></div>
        </div>
    )
}

export default NavBar