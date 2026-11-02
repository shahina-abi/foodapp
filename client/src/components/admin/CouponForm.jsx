// import React, { useState } from "react";
// import { axiosInstance } from "../../config/axiosIntance";
// import { toast } from "react-toastify";

// const CreateCouponForm = () => {
//   const [code, setCode] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");

//   const handleCreateCoupon = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("/admin/coupons", {
//         code,
//         discount,
//         expiryDate,
//       });

//       if (response.data.success) {
//         toast.success("Coupon created successfully!");
//         setCode("");
//         setDiscount("");
//         setExpiryDate("");
//       } else {
//         toast.error(response.data.message || "Failed to create coupon");
//       }
//     } catch (error) {
//       console.error("Error creating coupon:", error);
//       toast.error("An error occurred while creating the coupon.");
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-lg font-bold mb-4">Create Coupon</h2>
//       <form onSubmit={handleCreateCoupon}>
//         <div className="mb-4">
//           <label htmlFor="code" className="block font-medium">
//             Code
//           </label>
//           <input
//             id="code"
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="discount" className="block font-medium">
//             Discount (%)
//           </label>
//           <input
//             id="discount"
//             type="number"
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="expiryDate" className="block font-medium">
//             Expiry Date
//           </label>
//           <input
//             id="expiryDate"
//             type="date"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             className="w-full border rounded p-2"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Create Coupon
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateCouponForm;
import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosIntance";
import { toast } from "react-toastify";

const CreateCouponForm = ({ onCouponCreated }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  // Get restaurantId from localStorage (or another source)
  const restaurantId = localStorage.getItem("restaurantId");

  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/admin/coupons", {
        code,
        discount,
        expiryDate,
        restaurantId, // Include restaurantId in the request
      });

      if (response.data.success) {
        toast.success("Coupon created successfully!");
        setCode("");
        setDiscount("");
        setExpiryDate("");

        // Trigger the callback to refresh the coupon list
        if (onCouponCreated) {
          onCouponCreated();
        }
      } else {
        toast.error(response.data.message || "Failed to create coupon");
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("An error occurred while creating the coupon.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Create Coupon</h2>
      <form onSubmit={handleCreateCoupon}>
        <div className="mb-4">
          <label htmlFor="code" className="block font-medium">
            Code
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block font-medium">
            Discount (%)
          </label>
          <input
            id="discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block font-medium">
            Expiry Date
          </label>
          <input
            id="expiryDate"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Coupon
        </button>
      </form>
    </div>
  );
};

export default CreateCouponForm;
