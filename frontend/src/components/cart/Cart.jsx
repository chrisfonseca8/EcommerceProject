import React, { useState } from "react";
import { GettingCartContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const navigate = useNavigate();
    const { cartItems, clearCart, removeFromCart,updateCounter } = GettingCartContext()
    let counter = 0;
    for (const item of cartItems) {
        counter = counter +item.price*item.quantity;
    }
    console.log(cartItems);
  
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">

            {/* CART TITLE */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-lg font-medium">
                    YOUR <span className="font-semibold">CART</span> —
                </h1>

                <button
                    onClick={clearCart}
                    className="text-sm border px-4 py-2 hover:bg-black hover:text-white transition"
                >
                    CLEAR CART
                </button>

            </div>
            <div className="grid md:grid-cols-[2fr_1fr] gap-16">
                <div className="space-y-6">
                    {
                        cartItems.map((item) => (
                            
                            <div className="flex items-center justify-between border-b pb-6">

                                <div className="flex items-center gap-4">

                                    <img
                                        src="/shirt.jpg"
                                        alt="product"
                                        className="w-16 h-20 object-cover"
                                    />

                                    <div>
                                        <p className="text-sm">
                                            {item.ProductName}
                                        </p>

                                        <div className="flex items-center gap-4 mt-2">
                                            <p className="text-sm font-medium">${item.price}</p>

                                            <span className="border px-2 py-1 text-xs">
                                                {item.size}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex items-center gap-6">

                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e)=>updateCounter(item.productId,item.size,e.target.value)}
                                        className="w-16 border px-2 py-1 text-sm"
                                    />

                                    <button 
                                    onClick={()=>removeFromCart(item.productId,item.size)}
                                    className="text-gray-500 hover:text-black">
                                        🗑
                                    </button>

                                </div>

                            </div>
                            
                        ))
                    }


                </div>

                {/* RIGHT SIDE - CART TOTALS */}
                <div className="border p-6 h-fit">

                    <h2 className="text-sm font-medium mb-6">
                        CART TOTALS —
                    </h2>

                    <div className="space-y-4 text-sm">

                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Subtotal</span>
                            <span>${counter}</span>
                        </div>

                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-500">Shipping Fee</span>
                            <span>$10</span>
                        </div>

                        <div className="flex justify-between font-medium pt-2">
                            <span>Total</span>
                            <span>${counter+10}</span>
                        </div>

                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="mt-6 w-full bg-black text-white py-3 text-sm hover:bg-gray-800">
                        PROCEED TO CHECKOUT
                    </button>

                </div>

            </div>

        </div>
    );
}