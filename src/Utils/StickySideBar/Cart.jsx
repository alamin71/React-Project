import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const [courseCount, setCourseCount] = useState(0);
  const { cart } = useContext(OrderContext); // Get cart from context

  useEffect(() => {
    // Update courseCount whenever the cart changes
    const items = JSON.parse(localStorage.getItem("cart")) || []; // cart from localStorage
    setCourseCount(items.length); // Set the count of courses
  }, [cart]); // Dependency array includes cart to re-run effect on cart change

  return (
    <Link
      to="/orderPage"
      className="hover:text-white w-12 flex relative justify-center bg-text_secondary text-white px-pl_primary py-pl_primary"
    >
      <FaShoppingCart className="text-text_xl z-10" />
      {courseCount > 0 && (
        <div className="absolute -top-4 -left-4 bg-red-600 flex items-center justify-center h-8 w-8 rounded-full">
          {courseCount}
        </div>
      )}
    </Link>
  );
};

export default Cart;
