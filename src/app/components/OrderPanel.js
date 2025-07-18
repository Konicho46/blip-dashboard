import { useState } from "react";

export default function OrderPanel({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateNote,
}) {
  const [showPayment, setShowPayment] = useState(false);
  const [orderType, setOrderType] = useState("Dine In");
  const [tableNo, setTableNo] = useState("");

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

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
            {orderItems.map((item, i) => (
              <div key={i}>
                {/* Top Row: Item details, quantity, total */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="max-w-[140px]">
                      <h4
                        className="font-semibold text-sm truncate"
                        title={item.name}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        Rp. {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#2A273D] text-center w-12 py-3 rounded-md font-semibold">
                    {item.qty}
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <button
                      onClick={() => onUpdateQuantity(item.name, item.qty + 1)}
                    >
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 0L11.1962 7.5H0.803848L6 0Z"
                          fill="#FFC500"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onUpdateQuantity(item.name, item.qty - 1)}
                    >
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 8L0.803848 0.5H11.1962L6 8Z"
                          fill="#FFC500"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm font-semibold w-24 text-right">
                    Rp. {(item.price * item.qty).toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Bottom Row: Note and Delete button */}
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="text"
                    placeholder="Order Note..."
                    value={item.note}
                    onChange={(e) => onUpdateNote(item.name, e.target.value)}
                    className="w-full bg-[#2A273D] text-sm text-white px-3 py-3 rounded-md placeholder:text-gray-400"
                  />
                  <button
                    onClick={() => onRemoveItem(item.name)}
                    className="border border-yellow-400 p-3 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>
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
            <p>Rp. {subtotal.toLocaleString("id-ID")}</p>
          </div>

          <button
            className="bg-yellow-400 text-black font-semibold w-full py-3 rounded-full relative"
            onClick={() => setShowPayment(true)}
            disabled={orderItems.length === 0}
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
        <aside className="w-[500px] bg-[#232136] text-white p-6 flex flex-col fixed right-0 top-0 h-full shadow-2xl z-20">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Payment</h2>
              <p className="text-sm text-gray-400">
                3 payment method available
              </p>
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
                <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2">
                  <span>💳</span> Credit Card
                </button>
                <button className="border border-yellow-700 text-yellow-400 px-4 py-2 rounded-md flex items-center gap-2">
                  <span>🅿️</span> Paypal
                </button>
                <button className="border border-yellow-700 text-yellow-400 px-4 py-2 rounded-md flex items-center gap-2">
                  <span>💵</span> Cash
                </button>
              </div>
            </div>

            {/* Credit Card Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Order success");
                setShowPayment(false);
              }}
            >
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
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Order Type</label>
                  <select
                    className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option>Dine In</option>
                    <option>Take It</option>
                    <option>Delivery</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">Table Number</label>
                  <input
                    type="text"
                    className="w-full bg-[#2A273D] text-white px-3 py-2 rounded-md"
                    placeholder="Table No."
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="bg-gray-600 text-white font-semibold w-1/2 py-3 rounded-full"
                  onClick={() => setShowPayment(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-400 text-black font-semibold w-1/2 py-3 rounded-full"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </aside>
      )}
    </div>
  );
}
