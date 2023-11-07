import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { RiDashboardLine } from 'react-icons/ri'
import { PiUserSwitchDuotone } from 'react-icons/pi'
import { MdOutlineSoupKitchen } from 'react-icons/md'
import { IoFastFoodOutline } from 'react-icons/io5'
import { BsCartCheck } from 'react-icons/bs'
import { MdOutlineTableBar } from 'react-icons/md'
import { Context } from '../App'

import { AiOutlineCloseCircle } from 'react-icons/ai'



const Element = [


    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <RiDashboardLine />,

    },
    {
        name: "Users",
        path: "/Users",
        icon: < PiUserSwitchDuotone />

    },
    {
        name: "Product Category",
        path: "/productcategory",
        icon: <MdOutlineSoupKitchen />

    },
    {
        name: "Product",
        path: "/product",
        icon: <IoFastFoodOutline />

    },
    {
        name: "Active Orders",
        path: "/activeorder",
        icon: <BsCartCheck />

    },
    {
        name: "Tables",
        path: "/tables",
        icon: < MdOutlineTableBar />

    },

]
const SideBar = () => {



    const location = useLocation();

    const data = useContext(Context)

    // console.log(data.openSideBar)

    const btnClose = () => {
        data.setOpenSideBar(!data.openSideBar)
    }

    return (
        <div>
            <div className={`${data.openSideBar ? "fixed left-0 top-0" : "hidden "} sm:flex  h-screen w-96 bg-teal-900 flex items-center justify-center  text-white`}>
                <button className='text-right text-lg my-4 absolute top-0 right-0 sm:hidden' onClick={btnClose}> <AiOutlineCloseCircle /></button>
                <div className=' w-full'>
                    {
                        Element.map((items, index) => {
                            return (
                                <div className='w-full h-auto text-lg  text-white px-6 py-2 '>
                                    <Link to={items.path} className={`${location.pathname === items.path ? "bg-slate-400" : " "} flex hover:bg-slate-400  items-center  gap-3 p-4  rounded-lg `}> {items.icon} {items.name} </Link>
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}

export default SideBar