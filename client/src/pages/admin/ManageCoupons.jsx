// export default ManageCoupons;
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";
import CreateCouponForm from "../../components/admin/CouponForm";
import Sidebar from "../../components/admin/SideBar";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  // Get restaurantId from localStorage (or another source)
  const restaurantId = localStorage.getItem("restaurantId");

  const fetchCoupons = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/admin/coupons?restaurantId=${restaurantId}`
      );
      setCoupons(data.coupons);
    } catch (err) {
      toast.error("Failed to fetch coupons");
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchCoupons();
    }
  }, [restaurantId]);

  const deleteCoupon = async (couponId) => {
    try {
      await axiosInstance.delete(`/admin/coupons/${couponId}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
      toast.success("Coupon deleted!");
    } catch (err) {
      toast.error("Failed to delete coupon");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      <div>
        <h1 className="text-3xl font-bold mb-6">Manage Coupons</h1>

        {/* Create Coupon Form */}
        <CreateCouponForm onCouponCreated={fetchCoupons} />

        {/* Coupon List */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Available Coupons</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Code</th>
                <th className="p-3 border">Discount (%)</th>
                <th className="p-3 border">Expiry Date</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="text-center">
                  <td className="p-3 border">{coupon.code}</td>
                  <td className="p-3 border">{coupon.discount}%</td>
                  <td className="p-3 border">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => deleteCoupon(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCoupons;
