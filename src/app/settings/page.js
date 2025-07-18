'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Plus, Settings2, Pencil, X } from 'lucide-react';

const tabs = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];

const dummyData = [
  {
    id: 1,
    name: 'Spicy seasoned seafood noodles',
    price: 43000,
    stock: 20,
    image: '/menu/spicy-seafood-noodle.jpg',
  },
  {
    id: 2,
    name: 'Salted Pasta with mushroom sauce',
    price: 35000,
    stock: 30,
    image: '/menu/salted-pasta.jpg',
  },
];

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState('Hot Dishes');
  const [showAddDish, setShowAddDish] = useState(false);
  const [dishes, setDishes] = useState(dummyData);
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    stock: '',
    image: '',
  });

  const handleAddDish = (e) => {
    e.preventDefault();

    const newId = dishes.length + 1;

    const dish = {
      id: newId,
      name: newDish.name,
      price: Number(newDish.price),
      stock: Number(newDish.stock),
      image: newDish.image || '/images/noodle1.jpg', // fallback gambar
    };

    setDishes([...dishes, dish]);
    setNewDish({ name: '', price: '', stock: '', image: '' });
    setShowAddDish(false);
  };

  return (
    <main className="flex h-screen bg-[#252836] text-white">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto relative">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <div className="bg-[#1F1D2B] p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Products Management</h2>
            <button
              onClick={() => setShowAddDish(true)}
              className="bg-[#393C49] px-4 py-2 rounded-md text-sm flex items-center gap-2"
            >
              <Settings2 size={16} /> Manage Categories
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 text-sm font-medium border-b border-gray-700 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-2 ${
                  selectedTab === tab
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              className="border-2 border-dashed border-yellow-400 rounded-lg h-48 flex items-center justify-center cursor-pointer text-yellow-400"
              onClick={() => setShowAddDish(true)}
            >
              <Plus /> Add new dish
            </div>

            {dishes.map((dish) => (
              <div key={dish.id} className="bg-[#2D303E] rounded-lg overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 leading-tight">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Rp.{dish.price.toLocaleString("id-ID")} • {dish.stock} Bowls
                  </p>
                </div>
                <div className="bg-yellow-400 text-black text-sm text-center py-2 cursor-pointer flex items-center justify-center gap-2">
                  <Pencil size={14} /> Edit dish
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Over Form */}
        {showAddDish && (
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#2D303E] p-6 shadow-lg z-50 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add New Dish</h2>
              <button
                onClick={() => setShowAddDish(false)}
                className="text-gray-400 hover:text-white"
              >
                <X />
              </button>
            </div>

            {/* Category Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTab === tab ? 'bg-yellow-400 text-black' : 'bg-[#393C49] text-white'
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="border-2 border-dashed border-yellow-400 rounded-lg h-32 mb-4 flex items-center justify-center cursor-pointer text-yellow-400">
              + Add Picture
            </div>

            <form onSubmit={handleAddDish} className="flex flex-col gap-3">
              Product Name
              <input
                className="bg-[#393C49] px-3 py-2 rounded text-sm"
                placeholder="Click here"
                value={newDish.name}
                onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              />
              Price
              <input
                className="bg-[#393C49] px-3 py-2 rounded text-sm"
                placeholder="Click here"
                type="number"
                value={newDish.price}
                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
              />
              Stock
              <input
                className="bg-[#393C49] px-3 py-2 rounded text-sm"
                placeholder="Click here"
                type="number"
                value={newDish.stock}
                onChange={(e) => setNewDish({ ...newDish, stock: e.target.value })}
              />
              Item
              <input
                className="bg-[#393C49] px-3 py-2 rounded text-sm"
                placeholder="Click here"
                value={newDish.image}
                onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
              />
              <button
                type="submit"
                className="mt-4 bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
