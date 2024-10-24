import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import axios from "axios";

const Courses = () => {
  const { cart, addToCart } = useContext(OrderContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://itder.com/api/get-course-list"
        );
        const data = response.data;
        setCourses(data.courseData); // Fetch and set courses data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleAddToCart = (course) => {
    console.log("Cart State:", cart);
    if (cart.length > 0 && cart[0].id !== course.id) {
      console.log("Attempt to add different course");
      toast.error("You can only add one course to the cart!");
    } else {
      addToCart(course);
      toast.success("Course added to cart!");
    }
  };
  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={course.photo}
                alt="course_photo"
                className="content-center"
              />
              <div className="absolute top-0 left-0 p-2">
                <h3 className="text-white text-xl font-bold">
                  {course.course_name}
                </h3>
              </div>
            </div>
            <div className="p-4">
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
              <div className="mt-4 flex justify-between items-center">
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
              <div className="mt-4 flex gap-2">
                {cart.length > 0 && cart[0].id === course.id ? (
                  <div className="flex items-center w-full justify-between">
                    {/* <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      onClick={() => addToCart(course)}
                    >
                      -
                    </button> */}
                    {/* <span>{cart[0].quantity}</span>
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      onClick={() => addToCart(course)}
                    >
                      +
                    </button> */}
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
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
