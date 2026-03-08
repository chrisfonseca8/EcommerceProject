import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault();
        console.log('function was hit')
        try {
            const responce = await fetch(`http://localhost:3000/User/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await responce.json();
            if (responce.ok) {
                navigate("/Home")
            } else {
                console.log('data was not fetched corectly',data);
            }
        } catch (error) {
            console.log(error, "there was sme error")
            alert("Something went wrong",error);

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-between">

            {/* Login Section */}
            <div className="flex items-center justify-center py-24">
                <div className="w-full max-w-md text-center">

                    <h2 className="text-2xl font-light mb-8">
                        Login —
                    </h2>

                    <form
                        onSubmit={submitLogin}
                        className="space-y-4">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-black"
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 px-4 py-2 outline-none focus:border-black"
                        />

                        <div className="flex justify-between text-sm text-gray-500">
                            <span className="cursor-pointer hover:underline">
                                Forgot your password?
                            </span>

                            <span className="cursor-pointer hover:underline">
                                Create account
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 mt-4 hover:bg-gray-800"
                        >
                            Sign in
                        </button>

                    </form>

                </div>
            </div>

            {/* Subscribe Section */}
            <div className="text-center py-20 border-t">

                <h3 className="text-xl font-semibold mb-2">
                    Subscribe now & get 20% off
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <div className="flex justify-center max-w-md mx-auto">

                    <input
                        type="email"
                        placeholder="Enter your email id"
                        className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                    />

                    <button className="bg-black text-white px-6 hover:bg-gray-800">
                        SUBSCRIBE
                    </button>

                </div>

            </div>

        </div>
    );
}