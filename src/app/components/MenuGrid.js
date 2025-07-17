import FoodCard from "./FoodCard";

export default function MenuGrid({ items }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <FoodCard
          key={idx}
          name={item.name}
          price={item.price}
          stock={item.stock}
          image={item.image}
        />
      ))}
    </div>
  );
}
