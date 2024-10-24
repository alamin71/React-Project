import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
  const [examID, setExamID] = useState(null);
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const isInitialMount = useRef(true);

  const addToCart = (course) => {
    if (course.remove) {
      removeFromCart();
      return;
    }

    if (cart.length > 0 && cart[0].id !== course.id) {
      toast.error("You can only add one course to the cart!");
      return;
    }

    setCart((prevCart) => {
      if (prevCart.length > 0 && prevCart[0].id === course.id) {
        const updatedCourse = {
          ...course,
          quantity: prevCart[0].quantity + 1,
        };
        return [updatedCourse];
      } else {
        return [{ ...course, quantity: 1 }];
      }
    });
  };

  const removeFromCart = () => {
    setCart([]);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("CourseDraft")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      localStorage.setItem("CourseDraft", JSON.stringify(cart));
    } else {
      isInitialMount.current = false;
    }
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
