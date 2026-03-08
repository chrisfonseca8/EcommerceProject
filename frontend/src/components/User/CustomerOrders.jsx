import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

export default function CustomerOrders() {

  const { cusId } = useParams();
  const [order, setorder] = useState([]);

useEffect(() => {
  fetch(`https://ecommerceproject-l76n.onrender.com/order/${cusId}/CusOrders`, {
    method: "GET",
    credentials: "include"
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("JWT token not found or unauthorized");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setorder(data);
    })
    .catch((err) => {
      console.error("Order fetch failed:", err.message);
    });
}, [cusId]);


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Title */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xl font-semibold tracking-wide">MY ORDERS</h2>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* Orders */}
      <div className="space-y-6">

        {order.map((ord) =>
          ord.order.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-6"
            >

              {/* Left Side */}
              <div className="flex items-center gap-6">

                <img
                  src={item.product.images && item.product.images[0]}
                  alt=""
                  className="w-20 h-20 object-cover"
                />

                <div>
                  <h3 className="font-medium">
                    {item.product.ItemName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ${item.priceAtPurchase} &nbsp; | &nbsp;
                    Quantity: {item.qunatity || 1}
                  </p>
                </div>

              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm">

                <span className="w-2 h-2 bg-green-500 rounded-full"></span>

                <span className="text-gray-600">
                  {ord.orderStatus}
                </span>

              </div>

              {/* Button */}
              <button className="border px-5 py-2 text-sm rounded hover:bg-gray-100">
                Track Order
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}