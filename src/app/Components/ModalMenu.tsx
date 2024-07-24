"use client";

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const ModalMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button className="text-3xl p-2" onClick={toggleModal}>
        <FaBars />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-lg relative">
            {/* Close Icon */}
            <button className="absolute top-3 right-3 text-2xl bg-black" onClick={toggleModal}>
              <FaTimes />
            </button>
            <ul className="space-y-4 mt-6 text-black">
              <li className="border-b border-black py-2">Home</li>
              <li className="border-b border-black py-2">Billing</li>
              <li className="border-b border-black py-2">Payments</li>
             
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalMenu;
