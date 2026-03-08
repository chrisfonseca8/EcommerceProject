import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Collection() {

  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([]);
  const [products,setProducts] = useState([]);

  useEffect(() => {

    const queryObj = new URLSearchParams();
    gender.forEach((g) => queryObj.append('gender',g));
    category.forEach((cat) => queryObj.append('category',cat));

   // console.log(queryObj.toString());
   const query = queryObj.toString();
  fetch(`http://localhost:3000/items/?${query}`)
   .then(res=>res.json())
   .then(data=>{
    console.log(data);
    setProducts(data)
   })

  }, [gender, category])

const handelGender = (gender) => {
  setGender((prev) => {
   console.log(prev);

    return prev.includes(gender)
      ? prev.filter((g) => g !== gender)
      : [...prev, gender];
  });

 // console.log(gender);
};

const handelCategory = (category) => {
  setCategory((prev) =>{
    console.log(prev);
   return prev.includes(category)
      ? prev.filter((c) => c !== category)
      : [...prev, category]
});


};

  // const products = Array(12).fill({
  //   name: "Men Round Neck Pure Cotton T-shirt",
  //   price: "$149",
  //   image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  // });

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid grid-cols-[250px_1fr] gap-12">

        {/* FILTERS */}
        <div className="space-y-8">

          <h3 className="text-sm font-medium tracking-wide">FILTERS</h3>

          {/* Categories */}
          <div className="border p-4">
            <p className="text-xs font-semibold mb-3">CATEGORIES</p>

            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelGender('Men')}
                  type="checkbox" />
                Men
              </label>

              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelGender('Woman')}

                  type="checkbox" />
                Women
              </label>

              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelGender('Kids')}
                  type="checkbox" />
                Kids
              </label>
            </div>
          </div>

          {/* Type */}
          <div className="border p-4">
            <p className="text-xs font-semibold mb-3">TYPE</p>

            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelCategory("TopWear")}
                  type="checkbox" />
                Topwear
              </label>

              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelCategory("BottomWear")}

                  type="checkbox" />
                Bottomwear
              </label>

              <label className="flex items-center gap-2">
                <input
                  onChange={() => handelCategory("innerWear")}

                  type="checkbox" />
                innerWear
              </label>
            </div>
          </div>

        </div>

        {/* PRODUCTS SECTION */}
        <div>

          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">

            <h2 className="text-lg font-medium tracking-wide">
              ALL COLLECTIONS —
            </h2>

            <select className="border px-3 py-2 text-sm">
              <option>Sort by: Price Low to High</option>
              <option>Sort by: Price High to Low</option>
              <option>Sort by: Newest</option>
            </select>

          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {products.map((product, index) => (
              <Link
                to={`/Item/${product._id}`}
                key={index}
                className="cursor-pointer hover:-translate-y-1 transition block"
              >

                <div className="bg-gray-200 h-64 overflow-hidden">
                  <img
                    src={product.images && product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.price}</p>
                </div>

              </Link>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}