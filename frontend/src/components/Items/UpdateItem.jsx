import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function UpdateItem() {


    const {itemId} = useParams();
    
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState(10);
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [gender, setGender] = useState('Men');
    const [category, setCategory] = useState('TopWear');
    const [small, setSmall] = useState(0);
    const [medium, setMedium] = useState(0);
    const [large, setLarge] = useState(0);
    const [xLarge, setXlarge] = useState(0);
    const [XXLarge, setXXlarge] = useState(0);

    const [item,setItem]  = useState({});

    useEffect(()=>{
        fetch(`https://ecommerceproject-l76n.onrender.com/items/${itemId}`)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setItem(data)
            setGender(data.gender)
            setCategory(data.category);
             data.sizes.forEach(obj => {
                if(obj.size==='S'){
                    setSmall(obj.stock)
                }
               else if(obj.size==='M'){
                    setMedium(obj.stock)
                }
              else if(obj.size==='L'){
                    setLarge(obj.stock)
                }
               else if(obj.size==='XL'){
                    setXlarge(obj.stock)
                }
              else  if(obj.size==='XXL'){
                    setXXlarge(obj.stock)
                }
             });
        })
    },[itemId])   


    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const responce = await fetch(`http://localhost:3000/items/${itemId}/update`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    itemName,
                    description,
                    price,
                    imageUrl,
                    gender,
                    category,
                    small,
                    medium,
                    large,
                    xLarge,
                    XXLarge
                })
            })

            const data = await responce.json();
            if (responce.ok) {
                console.log(data);
                navigate('/Home');
            } else {
                console.log('data was not recovered', data)
            }
        } catch (error) {
            console.log(error, "there was sme error")
            alert("Something went wrong", error);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>

            <form
                onSubmit={submitForm}
                className="space-y-4">

                {/* Item Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        name="ItemName"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder={item.ItemName}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        name="price"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder={item.price}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        className="w-full border rounded-md px-3 py-2"
                        rows="3"
                        placeholder={item.description}
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        type="text"
                        name="image"
                        className="w-full border rounded-md px-3 py-2"
                        placeholder={item.images && item.images[0]}
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)} name="gender" className="w-full border rounded-md px-3 py-2">
                        <option value='Men'>Men</option>
                        <option value='Woman'> Woman</option>
                        <option value='Kids'>Kids</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} name="category" className="w-full border rounded-md px-3 py-2">
                        <option>TopWear</option>
                        <option>BottomWear</option>
                        <option>innerWear</option>
                    </select>
                </div>

                {/* Sizes + Stock */}
                <div>
                    <label className="block text-sm font-medium mb-2">Stock per Size</label>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-sm">S</label>
                            <input
                                value={small}
                                onChange={(e) => setSmall(e.target.value)}
                                type="number" className="w-full border rounded-md px-2 py-1" />
                        </div>

                        <div>
                            <label className="text-sm">M</label>
                            <input
                                value={medium}
                                onChange={(e) => setMedium(e.target.value)}
                                type="number" className="w-full border rounded-md px-2 py-1" />
                        </div>

                        <div>
                            <label className="text-sm">L</label>
                            <input
                                value={large}
                                onChange={(e) => setLarge(e.target.value)}
                                type="number" className="w-full border rounded-md px-2 py-1" />
                        </div>

                        <div>
                            <label className="text-sm">XL</label>
                            <input
                                value={xLarge}
                                onChange={(e) => setXlarge(e.target.value)}
                                type="number" className="w-full border rounded-md px-2 py-1" />
                        </div>

                        <div>
                            <label className="text-sm">XXL</label>
                            <input

                                value={XXLarge}
                                onChange={(e) => setXXlarge(e.target.value)}
                                type="number" className="w-full border rounded-md px-2 py-1" />
                        </div>

                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                    Add Item
                </button>

            </form>
        </div>
    );
}