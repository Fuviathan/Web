import React from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { For } from 'react-haiku'

export default function SidebarItemChildren({Menu, open, openSub, setOpenSub, asPath}) {
    return (
        <>
            <div className='flex items-center p-2 mt-2 text-lg text-gray-300 rounded-md cursor-pointer hover:bg-light-white gap-x-4' onClick={() => setOpenSub(!openSub)}>
                <Menu.icon className='w-5 h-5' />
                <div className={`${!open && "hidden"} origin-left duration-300 flex gap-x-14`}>
                    <div className=''>
                        {Menu.title}
                    </div>
                    <ChevronDownIcon className={`w-5 h-6 mt-1 ${openSub && 'rotate-180'} duration-300`} />
                </div>
            </div>
            <div className={`${!openSub && "max-h-0 overflow-hidden"} duration-300 origin-bottom`}>
                <For each={Menu.children} render={(item, index) =>
                    <Link href={`${item.path}`} className={`${!open && "hidden"} origin-left duration-200 gap-x-14`}>
                        <li
                            className={`flex rounded-md p-2 pl-8 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4 mt-2 ${asPath.startsWith(item.path) && "bg-light-white"
                                }`}
                        >
                            <item.icon className='w-5 h-5 ' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {item.title}
                            </span>
                        </li>
                    </Link>
                } />
            </div>
        </>
    )
}
