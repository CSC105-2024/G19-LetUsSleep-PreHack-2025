import React, { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen bg-lblue">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
                <h2 className="text-3xl font-extrabold mb-6 text-black">LOG IN</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full max-w-sm px-4 py-3 mb-4 bg-gray-100 rounded-md focus:outline-none"
                />

                <div className="relative w-full max-w-sm mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-gray-100 rounded-md pr-10 focus:outline-none"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IconEye/> : <IconEyeClosed/> }
                    </button>
                </div>

                <button className="w-full max-w-sm bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800">
                    LOGIN
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    Don’t have an account{" "}
                    <a href="/register" className="text-pink-600 font-bold hover:underline decoration-2 ml-2">
                        Register
                    </a>
                </p>
            </div>

            {/* Background Stars */}
            <div className="hidden md:block md:w-1/2 text-dpink rounded-2xl bg-cover bg-center"></div>
        </div>
    );
}
