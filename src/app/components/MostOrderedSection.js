'use client'

import { useState } from 'react'

export default function MostOrderedSection() {
  const [showAll, setShowAll] = useState(false)

  const orderedDishes = [
    { name: 'Spicy seasoned seafood noodles', count: 200 },
    { name: 'Salted pasta with mushroom sauce', count: 120 },
    { name: 'Beef dumpling in hot and sour soup', count: 80 },
    { name: 'Fried chicken with garlic sauce', count: 75 },
    { name: 'Grilled salmon with lemon butter', count: 65 },
    { name: 'Crispy tofu bowl', count: 60 },
    { name: 'Tom Yum Soup', count: 55 },
  ]

  const dishesToShow = showAll ? orderedDishes : orderedDishes.slice(0, 3)

  return (
    <div className="bg-[#1F1D2B] p-5 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold text-lg">Most Ordered</h3>
        <select className="bg-[#1F1D2B] text-white text-sm">
          <option>Today</option>
        </select>
      </div>

      <ul className="space-y-3">
        {dishesToShow.map((dish, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full" />
              <div className="text-sm text-white">
                <p>{dish.name}</p>
                <p className="text-xs text-[#ABBBC2]">{dish.count} dishes ordered</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-5 border border-[#EA7C69] text-[#EA7C69] py-2 px-4 rounded-lg w-full hover:bg-[#EA7C69]/10 transition"
      >
        {showAll ? 'Hide' : 'View All'}
      </button>
    </div>
  )
}
