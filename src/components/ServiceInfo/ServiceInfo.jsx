import React from 'react';
import { FaTruck, FaUndo, FaMoneyBillAlt } from 'react-icons/fa'; // Importing icons from react-icons

const ServiceInfo = () => {
  return (
    <div className=" py-8">
      <div className="container mx-auto flex justify-evenly">
        {/* Cash on Delivery Section */}
        <div className="flex flex-col items-center text-center">
          <FaMoneyBillAlt className="text-4xl text-gray-700 mb-2" />
          <h3 className="text-lg font-semibold font-sans">CASH ON DELIVERY</h3>
          <p className="text-sm text-gray-500 font-sans">Pay cash at your doorstep</p>
        </div>

        {/* Delivery Section */}
        <div className="flex flex-col items-center text-center">
          <FaTruck className="text-4xl text-gray-700 mb-2" />
          <h3 className="text-lg font-semibold font-sans">DELIVERY</h3>
          <p className="text-sm text-gray-500 font-sans">All over Bangladesh</p>
        </div>

        {/* Happy Return Section */}
        <div className="flex flex-col items-center text-center">
          <FaUndo className="text-4xl text-gray-700 mb-2" />
          <h3 className="text-lg font-semibold font-sans">HAPPY RETURN</h3>
          <p className="text-sm text-gray-500 font-sans">7 days return facility</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
