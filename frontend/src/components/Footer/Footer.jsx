import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl tracking-widest font-light mb-4">
            FOREVER<span className="text-pink-400">.</span>
          </h2>
          <p className="text-gray-600 text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            COMPANY
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-black">Home</Link></li>
            <li><Link href="/about" className="hover:text-black">About us</Link></li>
            <li><Link href="/delivery" className="hover:text-black">Delivery</Link></li>
            <li><Link href="/privacy" className="hover:text-black">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold tracking-wide mb-4">
            GET IN TOUCH
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            +1-212-456-7890
          </p>
          <p className="text-sm text-gray-600">
            greatstackdev@gmail.com
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        Copyright 2024 © GreatStack.dev – All Rights Reserved.
      </div>
    </footer>
  );
}