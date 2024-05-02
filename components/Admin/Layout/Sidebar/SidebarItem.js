import React from 'react'
import Link from 'next/link'

export default function SidebarItem({ Menu, open, asPath }) {
    return (
        <Link href={`${Menu.path}`} className=''>
            <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2 ${asPath.startsWith(Menu.path) && "bg-light-white"
                    }`}
            >
                <Menu.icon className='w-5 h-5' />
                <span className={`${!open && "hidden"} origin-left duration-300`}>
                    {Menu.title}
                </span>
            </li>
        </Link>
    )
}
     