// app/page.js
"use client";
import Sidebar from "./components/Sidebar";
import OrderPanel from "./components/OrderPanel";
import FoodCard from "./components/FoodCard";
import { useState } from "react";

export default function Home() {
  const categories = [
    { label: "Hot Dishes", value: "hot" },
    { label: "Cold Dishes", value: "cold" },
    { label: "Grill", value: "grill" },
    { label: "Appetizer", value: "appetizer" },
    { label: "Dessert", value: "dessert" },
  ];

  const categorizedFoodItems = [
    {
      name: "Ice Cream Vanilla",
      price: 43000,
      stock: 20,
      image: "/menu/eskrim-vanilla.jpg",
      category: "cold",
    },
    {
      name: "Choco Ice Cream with colorful ice",
      price: 35000,
      stock: 11,
      image: "/menu/choco-icecream.jpeg",
      category: "cold",
    },
    {
      name: "Ice Dream Coffee",
      price: 65000,
      stock: 16,
      image: "/menu/eskrim-kopi.jpg",
      category: "cold",
    },
    {
      name: "Daluman",
      price: 45000,
      stock: 17,
      image: "/menu/daluman.jpg",
      category: "cold",
    },
    {
      name: "Angsle",
      price: 57000,
      stock: 13,
      image: "/menu/angsle.jpg",
      category: "hot",
    },
    {
      name: "Ice Cream Bubble Gum",
      price: 65000,
      stock: 22,
      image: "/menu/eskrim-bubblegum.jpg",
      category: "cold",
    },
  ];

  const [orderItems, setOrderItems] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("hot");

  // const filteredItems = categorizedFoodItems.filter(
  //   (item) => item.category === selectedCategory
  // );

  // State untuk search
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = categorizedFoodItems.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // fungsi untuk menghandle add item ke cart
  const handleAddItemToOrder = (foodItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.name === foodItem.name
      );
      if (existingItem) {
        // kalau udah ada tambah quantity
        return prevItems.map((item) =>
          item.name === foodItem.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // kalau belum ada tambah item baru
      return [...prevItems, { ...foodItem, qty: 1, note: "" }];
    });
  };

  // fungsi untuk menghandle update item di cart
  const handleUpdateQuantity = (itemName, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemName);
    } else {
      setOrderItems((prevItems) =>
        prevItems.map((item) =>
          item.name === itemName ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const handleRemoveItem = (itemName) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemName)
    );
  };

  const handleUpdateNote = (itemName, note) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName ? { ...item, note: note } : item
      )
    );
  };

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Made Resto</h1>
            <p className="text-sm text-gray-400">Tuesday, 2 Feb 2021</p>
          </div>
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-6 text-sm font-medium">
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`pb-1 ${
                selectedCategory === cat.value
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h1 className="text-xl font-semibold">Choose Dishes</h1>
          {/* Order Type Dropdown Card */}
          <div className="p-0 min-w-[220px] flex flex-col items-start border-0 shadow-none bg-transparent">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10m-9 4h6m-7 4h8m-5-8v8m4-8v8"
                />
              </svg>
              <span className="text-white font-semibold">Order Type</span>
            </div>
            <select
              id="orderType"
              name="orderType"
              className="border border-yellow-400 bg-yellow-400 text-white rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full mb-2"
              defaultValue="Dine In"
            >
              <option value="Dine In">Dine In</option>
              <option value="To Go">To Go</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <FoodCard
              key={index}
              name={item.name}
              price={item.price}
              stock={item.stock}
              image={item.image}
              onAddItem={() => handleAddItemToOrder(item)}
            />
          ))}
        </div>
      </div>

      <OrderPanel
        orderItems={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateNote={handleUpdateNote}
      />
    </main>
  );
}
