import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GettingCartContext } from "../cart/Context";

export default function CheckOut() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = GettingCartContext();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [placing, setPlacing] = useState(false);

  const [newAddress, setNewAddress] = useState({
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  // Fetch current user (to get saved addresses)
  useEffect(() => {
    fetch("https://ecommerceproject-l76n.onrender.com/User/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          navigate("/User/Login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setUser(data);
          if (data.addresses && data.addresses.length > 0) {
            setSelectedAddressIndex(0);
          } else {
            setShowNewForm(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        navigate("/User/Login");
      });
  }, []);

  const handleNewAddressChange = (e) => {
    setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    let val = e.target.value;
    if (e.target.name === "cardNumber") {
      val = val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (e.target.name === "expiry") {
      val = val.replace(/\D/g, "").slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
    }
    if (e.target.name === "cvv") {
      val = val.replace(/\D/g, "").slice(0, 3);
    }
    setPayment((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const getAddress = () => {
    if (showNewForm) return newAddress;
    return user?.addresses?.[selectedAddressIndex] ?? newAddress;
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    const addr = getAddress();
    if (!addr.addressLine1 || !addr.city || !addr.postalCode || !addr.country) {
      alert("Please fill in all required address fields.");
      return;
    }
    if (!payment.cardNumber || !payment.cardName || !payment.expiry || !payment.cvv) {
      alert("Please fill in all payment fields.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setPlacing(true);
    try {
      const response = await fetch("http://localhost:3000/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ cartItems, address: addr }),
      });
      const data = await response.json();
      if (response.ok) {
        clearCart();
        navigate("/Home");
      } else {
        alert(data.error || "Order placement failed.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-400 tracking-widest">LOADING...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Title */}
      <h1 className="text-lg font-medium tracking-wide mb-12">
        CHECKOUT —
      </h1>

      <div className="grid md:grid-cols-[1fr_380px] gap-16">

        {/* LEFT — ADDRESS + PAYMENT */}
        <div className="space-y-12">

          {/* ADDRESS SECTION */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide mb-6 pb-2 border-b">
              DELIVERY ADDRESS
            </h2>

            {/* Saved addresses */}
            {user?.addresses?.length > 0 && (
              <div className="space-y-3 mb-6">
                {user.addresses.map((addr, index) => (
                  <div
                    key={index}
                    onClick={() => { setSelectedAddressIndex(index); setShowNewForm(false); }}
                    className={`border p-4 cursor-pointer transition text-sm ${
                      !showNewForm && selectedAddressIndex === index
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 text-gray-700">
                        <p className="font-medium">{addr.addressLine1}</p>
                        {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                        <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p>{addr.country}</p>
                        {addr.phone && <p className="text-gray-500">{addr.phone}</p>}
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 ${
                        !showNewForm && selectedAddressIndex === index
                          ? "border-black bg-black"
                          : "border-gray-300"
                      }`} />
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => { setShowNewForm(true); setSelectedAddressIndex(null); }}
                  className={`w-full border p-3 text-sm text-center transition ${
                    showNewForm
                      ? "border-black bg-black text-white"
                      : "border-dashed border-gray-300 hover:border-black text-gray-500"
                  }`}
                >
                  + Add a new address
                </button>
              </div>
            )}

            {/* New address form */}
            {showNewForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Address Line 1 *</label>
                  <input
                    name="addressLine1"
                    value={newAddress.addressLine1}
                    onChange={handleNewAddressChange}
                    placeholder="Street address"
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Address Line 2</label>
                  <input
                    name="addressLine2"
                    value={newAddress.addressLine2}
                    onChange={handleNewAddressChange}
                    placeholder="Apartment, suite, etc."
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City *</label>
                  <input
                    name="city"
                    value={newAddress.city}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">State</label>
                  <input
                    name="state"
                    value={newAddress.state}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Postal Code *</label>
                  <input
                    name="postalCode"
                    value={newAddress.postalCode}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Country *</label>
                  <input
                    name="country"
                    value={newAddress.country}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Phone</label>
                  <input
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>
            )}
          </div>

          {/* PAYMENT SECTION */}
          <div>
            <h2 className="text-sm font-semibold tracking-wide mb-6 pb-2 border-b">
              PAYMENT DETAILS
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-xs text-gray-500 mb-1">Card Number</label>
                <input
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black tracking-widest"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Name on Card</label>
                <input
                  name="cardName"
                  value={payment.cardName}
                  onChange={handlePaymentChange}
                  placeholder="Full name"
                  className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Expiry</label>
                  <input
                    name="expiry"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    placeholder="•••"
                    type="password"
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400 pt-1">
                This is a demo. No real payment is processed.
              </p>

            </div>
          </div>

        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div>
          <div className="border p-6 sticky top-6">

            <h2 className="text-sm font-semibold tracking-wide mb-6">
              ORDER SUMMARY —
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="font-medium">{item.ProductName}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-700 ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="mt-8 w-full bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              {placing ? "PLACING ORDER..." : "PLACE ORDER"}
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}