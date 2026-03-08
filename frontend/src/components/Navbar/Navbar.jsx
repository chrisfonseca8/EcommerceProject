import { Search, User, ShoppingCart, Plus } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch logged in user whenever route changes
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/me", {
          credentials: "include"
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);

      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [location]);

  // Logout
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include"
      });

      setUser(null);
      setMenuOpen(false);
      navigate("/Home");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">

      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6">

        {/* Logo */}
        <Link to="/Home" className="text-2xl tracking-widest font-light">
          FOREVER<span className="text-pink-400">.</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-10 text-sm tracking-wide">
          <Link to="/Home" className="text-gray-600 hover:text-black transition">
            HOME
          </Link>

          <Link to="/collection" className="text-gray-600 hover:text-black transition">
            COLLECTION
          </Link>
        </nav>

        {/* Right icons */}
        <div className="flex items-center space-x-6 relative">

          {/* Search */}
          <Search className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />

          {/* Cart (Customer only) */}
          {user?.role === "Customer" && (
            <Link to="/cart">
              <ShoppingCart className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />
            </Link>
          )}

          {/* Create Item (Seller/Admin) */}
          {(user?.role === "Seller" || user?.role === "Admin") && (
            <Link to="/items/createItem">
              <Plus className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />
            </Link>
          )}

          {/* User dropdown */}
          <div className="relative">

            <User
              className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => setMenuOpen(prev => !prev)}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white border rounded-lg shadow-lg text-sm">

                {/* Guest */}
                {!user && (
                  <>
                    <Link
                      to="/user/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Customer Login
                    </Link>

                    <Link
                      to="/user/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Seller Login
                    </Link>
                  </>
                )}

                {/* Customer */}
                {user?.role === "Customer" && (
                  <>
                    <Link
                      to="/checkout"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Checkout
                    </Link>

                    <Link
                      to={`/orders/${user.id}/CusOrders`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}

                {/* Seller / Admin */}
                {(user?.role === "Seller" || user?.role === "Admin") && (
                  <>
                    <Link
                      to="/items/createItem"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Create Item
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                )}

              </div>
            )}

          </div>

        </div>
      </div>

    </header>
  );
}