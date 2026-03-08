import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responce = await fetch('http://localhost:3000/items/');
                const data = await responce.json();
                setProducts(data);
            } catch (error) {
                console.log('some error occures', error)
            }
        }

        fetchProducts();
    }, [])

    // const callApi = async () => {
    //     const response = await fetch('http://localhost:3000/items/');
    //     const data = await response.json()
    //     console.log(data)
    // }
    return (
        <div className="w-full bg-white">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 border border-gray-200">

                    {/* Left Content */}
                    <div className="flex flex-col justify-center p-12">
                        <p className="text-sm tracking-widest text-gray-500 mb-4">
                            OUR BESTSELLERS
                        </p>

                        <h1 className="text-4xl font-light mb-6">
                            Latest Arrivals
                        </h1>

                        <button className="w-fit border-b border-black text-sm tracking-wide">
                            SHOP NOW
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="bg-pink-200 min-h-[400px]">
                        {/* Replace with hero image */}
                    </div>

                </div>
            </section>


            {/* LATEST COLLECTIONS */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-10">
                    <h2 className="text-xl tracking-wide">
                        LATEST COLLECTIONS
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            to={`/Item/${product._id}`}
                            key={product._id}
                            className="group block cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="space-y-3">
                                <div className="bg-gray-200 h-64 w-full overflow-hidden">
                                    <img
                                        src={product.images && product.images[0]}
                                        alt={product.ItemName}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <p className="text-sm">{product.ItemName}</p>
                                <p className="text-sm text-gray-600">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </section>


            {/* BEST SELLER */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-10">
                    <h2 className="text-xl tracking-wide">
                        BEST SELLER
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="space-y-3">
                            <div className="bg-gray-200 h-64 w-full"></div>
                            <p className="text-sm">Product Name</p>
                            <p className="text-sm text-gray-600">$120</p>
                        </div>
                    ))}
                </div>

            </section>


            {/* FEATURES SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 text-center">

                    <div>
                        <div className="text-3xl mb-4">↺</div>
                        <h3 className="font-medium mb-2">Easy Exchange Policy</h3>
                        <p className="text-gray-500 text-sm">
                            We offer hassle free exchange policy
                        </p>
                    </div>

                    <div>
                        <div className="text-3xl mb-4">✔</div>
                        <h3 className="font-medium mb-2">7 Days Return Policy</h3>
                        <p className="text-gray-500 text-sm">
                            We provide 7 days free return policy
                        </p>
                    </div>

                    <div>
                        <div className="text-3xl mb-4">☎</div>
                        <h3 className="font-medium mb-2">Best Customer Support</h3>
                        <p className="text-gray-500 text-sm">
                            We provide 24/7 customer support
                        </p>
                    </div>

                </div>
            </section>


            {/* SUBSCRIBE SECTION */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center">
                <h3 className="text-xl mb-4">
                    Subscribe now & get 20% off
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <div className="flex border border-gray-300">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 outline-none text-sm"
                    />
                    <button className="bg-black text-white px-6 text-sm">
                        SUBSCRIBE
                    </button>
                </div>
            </section>

        </div>
    );
}