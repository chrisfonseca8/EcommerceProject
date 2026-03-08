import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GettingCartContext } from "../cart/Context";
import { useNavigate } from "react-router-dom";
export default function AboutItem() {


  const navigate = useNavigate();
  const { ItemId } = useParams();
  const [item, setItem] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [size, setSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL', 'XXl'];
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = GettingCartContext()

  useEffect(() => {
    const gettingItem = async () => {
      const responce = await fetch(`http://localhost:3000/items/${ItemId}`);
      const data = await responce.json();
      setItem(data);
      setMainImage(data.images && data.images[0]);
    }
    gettingItem();
  }, []);

  const updateItem = (itemId)=>{
     const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "Admin") {
    
    alert('you do not have access');
    console.log('admin access required')
  }else{
    navigate(`/items/${itemId}/update`)
  }


  }


  const deleteItem = async (itemId) => {
    try {
      const responce = await fetch(`http://localhost:3000/items/${itemId}/delete`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await responce.json();
      if (responce.ok) {
        console.log(data);
        navigate('/Home');
      } else {
        alert('some error occured', data);
        console.log(data);
      }


    } catch (error) {
      console.log(error);
      alert('getting repoce failed ', error);
      
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT IMAGE SECTION */}
        <div className="flex gap-4">

          <div className="flex flex-col gap-4">
            {(item.images || []).map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className="w-20 h-24 bg-gray-200 cursor-pointer overflow-hidden"
                style={{ border: mainImage === img ? '1px solid black' : '1px solid transparent' }}
              >
                <img src={img} alt={`view ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[500px]">
            <img
              src={mainImage}
              alt={item.ItemName}
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* RIGHT PRODUCT INFO */}
        <div>
          <h1 className="text-2xl font-medium mb-3">
            {item.ItemName}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="text-orange-500 text-sm">★★★★★</div>
            <span className="text-gray-500 text-sm">(122)</span>
          </div>

          <p className="text-xl font-semibold mb-4">
            ${item.price}
          </p>

          <p className="text-gray-500 text-sm mb-6">
            {item.description}
          </p>

          {/* SIZE SELECTOR */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">Select Size</p>
            <div className="flex gap-3">
              {
                sizes.map((sizecurrent) => (
                  <button
                    onClick={() => setSize(sizecurrent)}
                    className={`px-4 py-2 border text-sm ${sizecurrent === size
                      ? " border-black "
                      : "border-gray-300"
                      }`}
                  >{sizecurrent}</button>
                ))
              }

            </div>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-sm font-medium">Quantity</p>

            <div className="flex items-center gap-4">

              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-3 py-1 border border-gray-300"
              >
                -
              </button>

              <span className="text-sm w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={() => quantity < 5 && setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300"
              >
                +
              </button>

            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(item._id, quantity, item.ItemName, size,item.price)}
              className="bg-black text-white px-8 py-3 text-sm"
            >
              ADD TO CART
            </button>

            <button
              onClick={() => updateItem(item._id)}
              className="bg-blue-500 text-white px-6 py-3 text-sm hover:bg-blue-600"
            >
              UPDATE
            </button>

            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white px-6 py-3 text-sm hover:bg-red-600"
            >
              DELETE
            </button>
          </div>
          <div className="mt-6 text-gray-500 text-sm space-y-2">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION SECTION */}
      <div className="mt-20 border">
        <div className="flex border-b">
          <button className="px-6 py-3 text-sm border-b-2 border-black">
            Description
          </button>
          <button className="px-6 py-3 text-sm">
            Reviews (122)
          </button>
        </div>

        <div className="p-6 text-gray-600 text-sm">
          <p>
            An e-commerce website is an online platform that facilitates
            buying and selling products over the internet...
          </p>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20">
        <h2 className="text-center text-xl mb-10 tracking-wide">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="space-y-3 cursor-pointer hover:-translate-y-1 transition">
            <div className="bg-gray-200 h-64"></div>
            <p className="text-sm">Men Round Neck Pure Cotton T-shirt</p>
            <p className="text-sm text-gray-600">$149</p>
          </div>

          <div className="space-y-3 cursor-pointer hover:-translate-y-1 transition">
            <div className="bg-gray-200 h-64"></div>
            <p className="text-sm">Men Round Neck Pure Cotton T-shirt</p>
            <p className="text-sm text-gray-600">$149</p>
          </div>

          <div className="space-y-3 cursor-pointer hover:-translate-y-1 transition">
            <div className="bg-gray-200 h-64"></div>
            <p className="text-sm">Men Round Neck Pure Cotton T-shirt</p>
            <p className="text-sm text-gray-600">$149</p>
          </div>

          <div className="space-y-3 cursor-pointer hover:-translate-y-1 transition">
            <div className="bg-gray-200 h-64"></div>
            <p className="text-sm">Men Round Neck Pure Cotton T-shirt</p>
            <p className="text-sm text-gray-600">$149</p>
          </div>

          <div className="space-y-3 cursor-pointer hover:-translate-y-1 transition">
            <div className="bg-gray-200 h-64"></div>
            <p className="text-sm">Men Round Neck Pure Cotton T-shirt</p>
            <p className="text-sm text-gray-600">$149</p>
          </div>
        </div>
      </div>

    </div>
  );
}