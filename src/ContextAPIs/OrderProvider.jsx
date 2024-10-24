import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast"; // Import toast for error messages

export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [examID, setExamID] = useState(null);
  const [open, setOpen] = useState(true);
  const sidebarRef = useRef(null);

  // Cart state
  const [cart, setCart] = useState(() => {
    // Retrieve cart from localStorage, if available
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add course to cart
  const addToCart = (course) => {
    if (cart.length > 0 && cart[0].id !== course.id) {
      // If there's already a course in the cart and it's not the same as the one being added
      toast.error("You can only add one course to the cart!"); // Show error message
    } else {
      // If the same course is added, increase the quantity or add the course
      const existingCourse = cart.find((item) => item.id === course.id);

      if (existingCourse) {
        // If course exists, increase quantity
        setCart(
          cart.map((item) =>
            item.id === course.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        console.log("Increased quantity for course:", course); // Check when quantity is increased
      } else {
        // Add new course to cart with quantity 1
        setCart([...cart, { ...course, quantity: 1 }]); // Reset cart to this course
        console.log("New course added to cart:", course); // Log when a new course is added
      }
    }
  };

  // Function to remove course from cart
  const removeFromCart = () => {
    setCart([]); // Clear the cart
    localStorage.removeItem("cart"); // Remove from localStorage
    toast.success("Course removed from cart!"); // Show success message
  };

  const info = {
    examID,
    setExamID,
    open,
    setOpen,
    sidebarRef,
    setCart,
    cart, // Expose cart state
    addToCart, // Expose addToCart function
    removeFromCart, // Expose removeFromCart function
  };

  return <OrderContext.Provider value={info}>{children}</OrderContext.Provider>;
};

export default OrderProvider;
