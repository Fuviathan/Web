import React, { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AdminHeader() {
    const [auth, setAuth] = useState();

    let value;
    if (typeof window !== "undefined") {
        value = JSON.parse(localStorage.getItem("user")) || null;
    }
    useEffect(() => {
        // Get the value from local storage if it exists
        setAuth(value);
    }, []);
    function redirect() {
        window.location.href = '/'
    }
    
    function handleLogout() {
        setAuth("");
        localStorage.clear();
        toast.success("Bạn đã đăng xuất");
        setTimeout(redirect, 1000)
    }
    return (
        <div className="flex justify-end w-full px-8 py-2 bg-white shadow">
            <div className="flex items-center hover:cursor-pointer hover:opacity-70" onClick={handleLogout}>
                <UserIcon className="w-6 h-6 font-medium" />
                <div className="flex flex-col ml-3">
                    <div className="ml-3 text-lg">{auth?.lastName} {auth?.firstName}</div>
                    <div className="text-lg font-normal text-right">Đăng xuất</div>
                </div>
            </div>
        </div>
    );
}
