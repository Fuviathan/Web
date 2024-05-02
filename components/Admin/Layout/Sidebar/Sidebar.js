import React, { useState, useEffect } from 'react'
import { If, For } from 'react-haiku'
import { useRouter } from "next/router";
import SidebarItem from './SidebarItem';
import SidebarItemChildren from './SidebarItemChildren';

export default function Sidebar({ Menus, Menusub }) {
    const [auth, setAuth] = useState()
    let value;
    if (typeof window !== "undefined") {
        value = JSON.parse(localStorage.getItem("user")) || null;
    }
    useEffect(() => {
        // Get the value from local storage if it exists
        setAuth(value);
    }, []);
    const [open, setOpen] = useState(true)
    const [openSub, setOpenSub] = useState(false)
    const { asPath } = useRouter()
    return (
        <div
            className={` ${open ? "w-2/12 min-w-fit" : "w-[9vh] "
                } bg-dark-purple h-screen p-5 pt-5 relative duration-300`}
        >
            <img
                src="/control.png"
                className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                onClick={() => setOpen(!open)}
            />
            <div className="flex items-center gap-x-4">
                <img
                    src="/logo.png"
                    className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                        }`}
                />
                <h1
                    className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                        }`}
                >
                    Electronic Device
                </h1>
            </div>
            <ul className="pt-6">
                {/* <If isTrue={auth?.role == 'admin'}> */}
                <For each={Menus} render={(Menu, index) =>
                    <>
                        <If isTrue={!Menu.children}>
                            <SidebarItem Menu={Menu} open={open} asPath={asPath} />
                        </If>
                        <If isTrue={Menu.children}>
                            <SidebarItemChildren Menu={Menu} openSub={openSub} asPath={asPath} open={open} setOpenSub={setOpenSub} />
                        </If>
                    </>
                } />
                {/* </If> */}
                {/* <If isTrue={auth?.role == 'subadmin'}>
                    <For each={Menusub} render={(Menu, index) =>
                        <>
                            <If isTrue={!Menu.children}>
                                <SidebarItem Menu={Menu} open={open} asPath={asPath} />
                            </If>
                            <If isTrue={Menu.children}>
                                <SidebarItemChildren Menu={Menu} openSub={openSub} asPath={asPath} open={open} setOpenSub={setOpenSub} />
                            </If>
                        </>
                    } />
                </If> */}
            </ul>
        </div>
    )
}
