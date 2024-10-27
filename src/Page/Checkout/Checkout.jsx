import { useContext, useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import toast from "react-hot-toast";
// import axios from "axios";

const Checkout = () => {
  const { cart, setCart } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    dob: "",
    bloodGroup: "",
    photo: null,
  });

  useEffect(() => {
    // Load cart from localStorage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // const handleSubmitOrder = async (e) => {
  //   e.preventDefault();
  //   const orderData = {
  //     ...formData,
  //     cartItems: cart,
  //     totalAmount: calculateTotalPrice(),
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://itder.com/order-list",
  //       orderData
  //     );
  //     // Clear cart and localStorage
  //     setCart([]); // Clear cart context
  //     localStorage.removeItem("cart");
  //     console.log("Order submitted successfully: ", response.data);
  //     alert("Order submitted successfully!");
  //   } catch (error) {
  //     console.error("Error submitting order: ", error);
  //     alert("Failed to submit order. Please try again.");
  //   }
  // };
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Order details
    const orderData = {
      ...formData,
      cartItems: cart,
      totalAmount: calculateTotalPrice(),
    };
    console.log("Order Submitted:", orderData);

    // Clear cart and localStorage
    setCart([]);
    localStorage.removeItem("cart");

    toast.success("Order submitted successfully!");
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.discount_price * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="mt-5 border mx-2">
        <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
          <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
        </div>
        <form
          onSubmit={handleSubmitOrder}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {/* Trainee Information Section */}
          <div className="form-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-semibold text-base mb-2"
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="formNo"
                  className="block font-semibold text-base mb-2"
                >
                  Form No:
                </label>
                <input
                  type="text"
                  id="formNo"
                  value={formData.formNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            {/* Other form fields here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="parentName"
                  className="block font-semibold text-base mb-2"
                >
                  Father/Mother Name:
                </label>
                <input
                  type="text"
                  id="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="parentNumber"
                  className="block font-semibold text-base mb-2"
                >
                  Number:
                </label>
                <input
                  type="text"
                  id="parentNumber"
                  value={formData.parentNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            {/* Continue adding other fields in the same manner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="school"
                  className="block font-semibold text-base mb-2"
                >
                  School/College:
                </label>
                <input
                  type="text"
                  id="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="jobInfo"
                  className="block font-semibold text-base mb-2"
                >
                  Job Information:
                </label>
                <input
                  type="text"
                  id="jobInfo"
                  value={formData.jobInfo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-base mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block font-semibold text-base mb-2"
                >
                  Gender:
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="presentAddress"
                  className="block font-semibold text-base mb-2"
                >
                  Present Address:
                </label>
                <textarea
                  id="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="permanentAddress"
                  className="block font-semibold text-base mb-2"
                >
                  Permanent Address:
                </label>
                <textarea
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="nid"
                  className="block font-semibold text-base mb-2"
                >
                  NID Number:
                </label>
                <input
                  type="text"
                  id="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block font-semibold text-base mb-2"
                >
                  Mobile No:
                </label>
                <input
                  type="text"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="guardianName"
                  className="block font-semibold text-base mb-2"
                >
                  Local Guardian’s Name:
                </label>
                <input
                  type="text"
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block font-semibold text-base mb-2"
                >
                  Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="bloodGroup"
                  className="block font-semibold text-base mb-2"
                >
                  Blood Group:
                </label>
                <select
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="photo"
                  className="block font-semibold text-base mb-2"
                >
                  Photo:
                </label>
                <input
                  type="file"
                  id="photo"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
          {/* Cart Section */}
          <div className="m-mt_16px">
            <h3 className="text-lg font-bold pb-3">Order Summary</h3>
            <div className="pt-p_16px">
              <div className="lg:flex items-start gap-3">
                <div className="w-full lg:w-[58%] bg-white border-2">
                  <table className="overflow-x-auto w-full">
                    <thead>
                      <tr className="border-b-4 border-gray-300">
                        <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                          Course
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Price
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Quantity
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Sub Total
                        </th>
                      </tr>
                    </thead>

                    {/* cart part */}
                    <tbody className="overflow-x-auto">
                      {cart.map((item) => (
                        <tr
                          className="border-b border-gray-300 overflow-x-auto"
                          key={item.id}
                        >
                          <td>
                            <div className="flex items-center justify-center">
                              <div className="w-[20%] text-center flex items-center justify-center">
                                <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                              </div>
                              <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                                <div className="mask">
                                  <img
                                    className="h-[40px] w-[70px]"
                                    src={item.photo}
                                    alt="Course"
                                  />
                                </div>
                                <p className="text-[14.4px] px-[7px] text-center flex">
                                  {item.course_name}{" "}
                                  <span className="hidden lg:flex">
                                    {" "}
                                    - {item.unit}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                              {item.discount_price}
                            </p>
                          </td>
                          <td>
                            <div className="flex justify-center">
                              <div className="border">
                                <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                                  -
                                </button>
                              </div>
                              <div className="border-y">
                                <input
                                  type="number"
                                  value={item.quantity}
                                  className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
                                  readOnly
                                />
                              </div>
                              <div className="border">
                                <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                              {item.discount_price * item.quantity}
                            </p>
                          </td>
                        </tr>
                      ))}
                      {cart.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center p-5">
                            No items in the cart.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="w-full lg:w-[42%] bg-white border-2 px-4">
                  <div className="p-4">
                    {/* <h3 className="text-lg font-bold">Order Summary</h3> */}
                    <div className="flex justify-between py-1 border-b border-gray-300">
                      <p className="text-black font-bold">Total Price</p>
                      <p className="text-black font-bold">
                        {calculateTotalPrice()}
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className=" submit-button bg-[#6f42c1] text-white px-4 py-2 rounded-md"
                      >
                        Submit Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
