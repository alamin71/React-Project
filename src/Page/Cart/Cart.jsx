import { useContext, useEffect } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(OrderContext);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  const handleRemove = (courseId) => {
    const updatedCart = cart.filter((course) => course.id !== courseId);
    setCart(updatedCart);
    toast.success("Course removed from cart!");
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleQuantityChange = (courseId, type) => {
    const updatedCart = cart.map((course) => {
      if (course.id === courseId) {
        if (type === "increase") {
          return { ...course, quantity: (course.quantity || 1) + 1 };
        } else if (type === "decrease" && (course.quantity || 1) > 1) {
          return { ...course, quantity: (course.quantity || 1) - 1 };
        }
      }
      return course;
    });

    setCart(updatedCart); // Update the cart
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  if (!cart || cart.length === 0) {
    return <div>No courses in the cart.</div>;
  }

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
                {cart.map((course) => (
                  <tr key={course.id} className="border-b border-gray-300">
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="w-[20%] text-center">
                          <RiDeleteBin5Line
                            className="text-xl hover:text-footer_color cursor-pointer"
                            onClick={() => handleRemove(course.id)}
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
                          onClick={() =>
                            handleQuantityChange(course.id, "decrease")
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="font-bold w-[30px] lg:w-[60px] text-center border border-gray-300 p-[7px]"
                          value={course.quantity || 1} // Use quantity from course
                          readOnly
                        />
                        <button
                          className="px-4 w-[30px] font-bold"
                          onClick={() =>
                            handleQuantityChange(course.id, "increase")
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk {course.discount_price * (course.quantity || 1)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 lg:mt-0 w-full lg:w-[40%] lg:flex lg:flex-col lg:items-start lg:gap-3">
            <div className="p-3 bg-white w-full h-full">
              <h3 className="font-bold text-[16px]">Total</h3>
              <div className="flex justify-between">
                <span className="py-3">Subtotal:</span>
                <span>
                  Tk{" "}
                  {cart.reduce(
                    (total, course) =>
                      total + course.discount_price * (course.quantity || 1),
                    0
                  )}
                </span>
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
