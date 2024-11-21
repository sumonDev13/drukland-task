"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaRegQuestionCircle, FaUser } from "react-icons/fa";
import { FaRegMessage, FaBasketShopping } from "react-icons/fa6";
import { LuContact } from "react-icons/lu";
import { IoMailUnreadOutline } from "react-icons/io5";
import {  CiSearch, CiDeliveryTruck } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

interface NavMenuItem {
  id: number;
  menuItem: string;
  href: string;
  hasDropdown?: boolean;
}

export default function Navbar()  {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navMenuList: NavMenuItem[] = [
    { id: 1, menuItem: "Business", href: "/", hasDropdown: true },
    { id: 2, menuItem: "Products", href: "/", hasDropdown: true },
    { id: 3, menuItem: "About Us", href: "/" },
  ];

  return (
    <>
      <div className="bg-[#DDDDDD] py-3 rounded-tl-md lg:ml-1">
        <div className="container">
          <div className="flex justify-end items-center lg:gap-4 gap-1">
            <div className="flex items-center gap-1">
              <p className="text-sm regular-text">FAQ</p>
              <FaRegQuestionCircle />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm regular-text">Send Inquiry</p>
              <IoMailUnreadOutline />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm regular-text">Live Support</p>
              <FaRegMessage />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-sm regular-text">Contact</p>
              <LuContact />
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-white transition-all duration-300 border-b-2 border-gray-400" 
    
      >
        <div className="container">
          <div className="flex justify-between items-center py-4 w-full">
            <div>
              <Link
                href="/"
                className="text-black text-4xl semibold-text capitalize"
              >
                Drukland.de
              </Link>
            </div>
            {!isMenuOpen && (
              <div className="block lg:hidden">
                <HiOutlineMenuAlt3
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  color="#000"
                  size={30}
                />
              </div>
            )}
            <nav className="lg:block hidden">
              <ul className="flex lg:items-center lg:gap-3">
                {navMenuList.map((item) => (
                  <li
                    key={item.id}
                    className="regular-text capitalize text-black flex items-center gap-1"
                  >
                    <Link href={item.href}>{item.menuItem}</Link>
                    {item.hasDropdown && <FiChevronDown size={16} />}
                  </li>
                ))}
                <li className="flex lg:w-[450px] items-center gap-1 border rounded-md border-[#292929] px-3 py-1">
                  <CiSearch color="#000" />
                  <input
                    type="search"
                    className="bg-transparent outline-none text-[#292929]"
                  />
                </li>
              </ul>
            </nav>
            <div className="hidden lg:flex items-center gap-1">
              <ul className="flex lg:items-center lg:gap-2">
                <li>
                  <CiDeliveryTruck color="#000" size={20} />
                </li>
                <li>
                  <FaUser color="#000" size={20} />
                </li>
                <li>
                  <FaBasketShopping color="#000" size={20} />
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed left-0 top-0 bg-[#000A14] bg-opacity-90 z-50 w-full h-screen">
              <div className="relative flex flex-col items-center justify-center lg:hidden h-full">
                {/* Close button */}
                <MdClose
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-5 text-[#fff]"
                  size={30}
                />
                <ul className="flex flex-col items-center gap-1">
                  {navMenuList.map((item) => (
                    <li
                      key={item.id}
                      className="text-lg capitalize text-[#ffffff] font-medium"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.menuItem}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 flex gap-3">
                <li>
                  <CiDeliveryTruck color="#ffffff" size={20} />
                </li>
                <li>
                  <FaUser color="#ffffff" size={20} />
                </li>
                <li>
                  <FaBasketShopping color="#ffffff" size={20} />
                </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};