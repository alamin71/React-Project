import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [examID, setExamID] = useState(null);
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  // const isInitialMount = useRef(true);

  const addToCart = (course) => {
    if (course.remove) {
      removeFromCart();
      return;
    }

    // Not allow double select
    if (cart.length > 0 && cart[0].id !== course.id) {
      toast.error("You can only add one course to the cart!");
      return;
    }

    setCart((prevCart) => {
      if (prevCart.length > 0 && prevCart[0].id === course.id) {
        const updatedQuantity = prevCart[0].quantity + 1; // Update quantity
        const updatedPrice = course.price * updatedQuantity; // Update price based on quantity
        const updatedCourse = {
          ...course,
          quantity: updatedQuantity,
          price: updatedPrice,
        };
        return [updatedCourse];
      } else {
        return [{ ...course, quantity: 1, price: course.price }];
      }
    });
  };

  // remove item from local storage
  const removeFromCart = () => {
    setCart([]);
    localStorage.removeItem("CourseDraft");
  };

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <OrderContext.Provider
      value={{
        examID,
        setExamID,
        open,
        setOpen,
        cart,
        setCart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
      <Toaster />
    </OrderContext.Provider>
  );
};

export default OrderProvider;
