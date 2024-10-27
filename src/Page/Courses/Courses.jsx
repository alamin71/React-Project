import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import axios from "axios";

const Courses = () => {
  const { cart, setCart, addToCart } = useContext(OrderContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://itder.com/api/get-course-list"
        );
        const data = response.data;
        setCourses(data.courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleAddToCart = (course) => {
    console.log("Cart State:", cart);
    if (cart.length > 0 && cart[0].id !== course.id) {
      toast.error("You can only add one course to the cart!");
    } else {
      addToCart(course);
      toast.success("Course added to cart!");
    }
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

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg flex flex-col h-full overflow-hidden"
          >
            <div className="relative flex-grow">
              <img
                src={course.photo}
                alt="course_photo"
                className="content-center w-96 h-96 rounded-md"
              />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-green-700 text-xl font-bold">
                  {/* {course.course_name} */}
                </h3>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-gray-800 text-lg font-semibold mb-2">
                {course.course_name}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="flex text-blue-500 text-md">★★★★★</span>
                <span className="ml-2 text-gray-600 text-md font-bold">
                  {course.trainer_data?.name || "Unknown Trainer"}
                </span>
              </div>
              <p className="text-gray-600 text-md mb-4">
                Course Details{" "}
                <span className="text-blue-500">Show Details</span>
              </p>
              <hr />
              <div className="mt-4 mb-8 flex justify-between items-center">
                <div>
                  <span className="line-through text-gray-400 text-sm">
                    Tk {course.regular_price}
                  </span>
                  <span className="text-green-600 text-md font-bold ml-2">
                    -
                    {Math.round(
                      ((course.regular_price - course.discount_price) /
                        course.regular_price) *
                        100
                    )}
                    %
                  </span>
                  <span className="text-black text-lg font-bold ml-2">
                    Tk {course.discount_price}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                {cart.length > 0 && cart[0].id === course.id ? (
                  <div className="flex items-center bg-stone-300 rounded py-1 w-full justify-around">
                    <button
                      className="bg-sky-700 text-white py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() =>
                        handleQuantityChange(course.id, "decrease")
                      }
                    >
                      -
                    </button>
                    <span>{cart[0].quantity}</span>
                    <button
                      className="bg-sky-700 text-white py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() =>
                        handleQuantityChange(course.id, "increase")
                      }
                    >
                      +
                    </button>
                    <button
                      className="bg-sky-700 text-white ml-8 py-1 px-2 rounded hover:bg-blue-600"
                      onClick={() => addToCart({ ...course, remove: true })}
                    >
                      Remove from cart
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md"
                    onClick={() => handleAddToCart(course)}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
