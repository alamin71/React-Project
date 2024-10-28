import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import OrderDetails from "../OrderDetails/OrderDetails";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handleSearch = () => {
    // Handle the search logic here
    console.log("Searching for:", searchTerm);
    setOrderId(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col text-text_40px font-bold items-center justify-center">
      <h1 className="w-[600px] mx-auto">Search here</h1>
      <div className="h-[52px] relative col-span-4 w-[600px] mx-auto">
        <input
          type="text"
          name="search"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black px-2 w-full block h-full outline-0 rounded-[4px] border"
        />
        <IoMdSearch
          onClick={handleSearch}
          className="text-2xl text-black absolute right-2 top-2 cursor-pointer"
        />
      </div>
      {orderId && <OrderDetails orderId={orderId} />}{" "}
    </div>
  );
};

export default Search;
