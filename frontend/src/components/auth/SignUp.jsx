import React, { useState } from "react";


import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//chrisFonseca


export default function Signup() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const role = params.get("role");

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const SendSignup = async (e) => {
        e.preventDefault();
        try {

            const responce = await fetch(`https://ecommerceproject-l76n.onrender.com/User/register/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // important since you use cookies
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role
                })
            })

            const data = await responce.json();
            if ((responce).ok) {
                navigate("/Home");
            } else {
                alert(data.error || "Not authorized");

                console.log(data)
            }

        } catch (error) {

            console.log(error, "there was sme error")
            alert("Something went wrong");

        }

    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

            {/* Signup Section */}
            <div className="flex items-center justify-center flex-1">
                <div className="w-full max-w-md bg-white p-8 shadow-md">

                    <h2 className="text-2xl font-light text-center mb-8">
                        Sign Up —
                    </h2>

                    <form
                        onSubmit={SendSignup}
                        className="space-y-5">
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black transition"
                        />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black transition"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-black transition"
                        />

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 mt-2 hover:bg-gray-800 transition"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>

            {/* Subscribe Section */}
            <div className="bg-white py-16 text-center border-t">
                <h3 className="text-xl font-semibold mb-2">
                    Subscribe now & get 20% off
                </h3>
                <p className="text-gray-500 mb-6 text-sm">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <div className="flex justify-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email id"
                        className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none"
                    />
                    <button className="bg-black text-white px-6 hover:bg-gray-800 transition">
                        SUBSCRIBE
                    </button>
                </div>
            </div>

        </div>
    );
}