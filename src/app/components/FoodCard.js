import { useEffect, useState } from "react";

export default function FoodCard({ name, price, stock, image, onAddItem }) {
  const [formattedPrice, setFormattedPrice] = useState(price);

  useEffect(() => {
    setFormattedPrice(price.toLocaleString("id-ID"));
  }, [price]);

  return (
    <button
      onClick={onAddItem}
      className="bg-[#1e1e2e] p-4 rounded-2xl text-white text-center hover:scale-105 transition-all duration-200"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full object-cover"
      />

      <h3 className="mt-3 font-semibold text-sm leading-tight">{name}</h3>

      <p className="text-yellow-400 mt-1 font-medium text-sm">
        Rp. {formattedPrice}
      </p>

      <p className="text-gray-400 text-xs">{stock} Bowls available</p>
    </button>
  );
}
