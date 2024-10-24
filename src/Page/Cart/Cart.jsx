import { useContext, useState } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(OrderContext);
  const [quantity, setQuantity] = useState(1); // Manage quantity locally

  if (!cart || cart.length === 0) {
    return <div>No courses in the cart.</div>;
  }

  const course = cart[0]; // Single course logic

  const handleRemove = () => {
    setCart([]); // Clear cart
    localStorage.removeItem("cart"); // Remove from localStorage
    toast.success("Course removed from cart!");
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1); // Increase quantity
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Decrease quantity, but not below 1
    }
  };

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
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
              <tbody>
                <tr className="border-b border-gray-300">
                  <td>
                    <div className="flex items-center justify-center">
                      <div className="w-[20%] text-center">
                        <RiDeleteBin5Line
                          className="text-xl hover:text-footer_color cursor-pointer"
                          onClick={handleRemove}
                        />
                      </div>
                      <div className="flex flex-col text-center items-center py-2 w-[80%]">
                        <img
                          className="h-[40px] w-[70px]"
                          src={course.photo}
                          alt="Course"
                        />
                        <p className="text-[14.4px] px-[7px]">
                          {course.course_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                      Tk {course.discount_price}
                    </p>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        className="px-4 w-[30px] font-bold"
                        onClick={() => handleQuantityChange("decrease")}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="font-bold w-[30px] lg:w-[60px] text-center border border-gray-300 p-[7px]"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="px-4 w-[30px] font-bold"
                        onClick={() => handleQuantityChange("increase")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                      Tk {course.discount_price * quantity}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 lg:mt-0 w-full lg:w-[40%] lg:flex lg:flex-col lg:items-start lg:gap-3">
            <div className="p-3 bg-white w-full h-full">
              <h3 className="font-bold text-[16px]">Total</h3>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Tk {course.discount_price * quantity}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-4 w-full bg-blue-500 text-white text-center py-2 px-4 rounded hover:bg-blue-600 font-bold"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
