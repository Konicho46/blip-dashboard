import { useState } from "react";

export default function OrderPanel() {
  const [showPayment, setShowPayment] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [tableNo, setTableNo] = useState("");

  return (
    <div className="flex relative">
      {/* Order Panel */}
      <aside className="w-[400px] bg-[#1E1B2E] text-white p-6 flex flex-col justify-between z-10">
        <div>
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Orders #34562</h2>
            <div className="flex gap-2 mt-4">
              {["Dine In", "Take It", "Delivery"].map((type, i) => (
                <button
                  key={i}
                  className={`px-4 py-1 rounded-md text-sm ${
                    type === orderType
                      ? "bg-yellow-400 text-black font-semibold"
                      : "border border-yellow-700 text-yellow-400"
                  }`}
                  onClick={() => setOrderType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Items */}
                <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                {[
                  {
                  name: "Spicy seasoned seafood noodles",
                  image: "/menu/spicy-seafood-noodle.jpg",
                  price: 43000,
                  qty: 2,
                  note: "Please, just a little bit spicy only.",
                  },
                  {
                  name: "Salted pasta with cheese.",
                  image: "/menu/salted-pasta.jpg",
                  price: 35000,
                  qty: 1,
                  note: "",
                  },
                  {
                  name: "Fried rice with chicken",
                  image: "/menu/chicken-friedrice.jpg",
                  price: 45000,
                  qty: 2,
                  note: "",
                  },
                  {
                  name: "Lasagna with cheese",
                  image: "/menu/lasagna.jpg",
                  price: 25000,
                  qty: 1,
                  note: "",
                  },
                ].map((item, i) => (
                  <div key={i}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="max-w-[140px]">
                      <h4 className="font-semibold text-sm truncate" title={item.name}>
                      {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                      Rp. {item.price.toLocaleString()}
                      </p>
                    </div>
                    </div>

                    <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-600 rounded-md px-2">
                      <span>{item.qty}</span>
                    </div>
                    <p className="text-sm font-semibold">
                      Rp.{(item.price * item.qty).toLocaleString()}
                    </p>
                    <button className="text-yellow-400 hover:text-red-500">
                      🗑
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Order Note..."
                  defaultValue={item.note}
                  className="w-full bg-[#2A273D] text-sm text-white mt-2 px-3 py-2 rounded-md placeholder:text-gray-400"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-1 text-gray-400">
            <p>Discount</p>
            <p>Rp0</p>
          </div>
          <div className="flex justify-between text-sm mb-4 font-medium">
            <p>Sub total</p>
            <p>Rp.296.000</p>
          </div>

          <button
            className="bg-yellow-400 text-black font-semibold w-full py-3 rounded-full relative"
            onClick={() => setShowPayment(true)}
          >
            Continue to Payment
            <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 text-yellow-400">
              ⬤
            </span>
          </button>
        </div>
      </aside>

      {/* Payment Side Page */}
      {showPayment && (
        <aside className="w-[400px] bg-[#232136] text-white p-6 flex flex-col fixed right-0 top-0 h-full shadow-2xl z-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className="text-sm text-gray-400">3 payment method available</p>
            </div>
            <button
              className="text-gray-400 hover:text-red-400 text-2xl"
              onClick={() => setShowPayment(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div>
            {/* Payment Methods */}
            <div className="mb-6">
              <div className="flex gap-3">
                <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md">
                  Credit Card
                </button>
                <button className="border border-yellow-700 text-yellow-400 px-4 py-2 rounded-md">
                  Paypal
                </button>
                <button className="border border-yellow-700 text-yellow-400 px-4 py-2 rounded-md">
                  Cash
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                  placeholder="Name on card"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Card Number</label>
                <input
                  type="text"
                  className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Expiration Date</label>
                  <input
                    type="text"
                    className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">CVV</label>
                  <input
                    type="password"
                    className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Order Type</label>
                <select
                  className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                  value={orderType}
                  onChange={e => setOrderType(e.target.value)}
                >
                  <option>Dine In</option>
                  <option>Take It</option>
                  <option>Delivery</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Table Number</label>
                <input
                  type="text"
                  className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                  placeholder="Table No."
                  value={tableNo}
                  onChange={e => setTableNo(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 text-black font-semibold w-full py-3 rounded-full mt-4"
              >
                Pay Now
              </button>
            </form>
          </div>
        </aside>
      )}
    </div>
  );
}
