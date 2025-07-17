'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Image from 'next/image'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend)

const dummyOrders = [
  { customer: 'Habil', menu: 'Beef dumpling in hot and sour soup', payment: 'Rp. 65.000', status: 'Pending' },
  { customer: 'Made', menu: 'Hot spicy fried rice with omelet', payment: 'Rp. 57.000', status: 'Completed' },
  { customer: 'Diah', menu: 'Hot spicy fried rice with omelet', payment: 'Rp. 57.000', status: 'Completed' },
  { customer: 'Bram', menu: 'Hot spicy fried rice with omelet', payment: 'Rp. 57.000', status: 'Completed' },
  { customer: 'Sofian Hadi', menu: 'Spicy seasoned seafood noodles', payment: 'Rp. 43.000', status: 'Completed' },
]

// Dummy data for Most Ordered
const mostOrderedData = [
  {
    name: 'Spicy seasoned seafood noodles',
    image: '/menu/spicy-seafood-noodle.jpg',
    ordered: 20,
  },
  {
    name: 'Salted pasta with mushroom sauce',
    image: '/menu/salted-pasta.jpg',
    ordered: 18,
  },
  {
    name: 'Beef dumpling in hot and sour soup',
    image: '/menu/beef-dumpling.jpg',
    ordered: 14,
  },
  {
    name: 'Hot spicy fried rice with omelet',
    image: '/menu/nasgor-telur-pedas.jpg',
    ordered: 12,
  },
]

// Dummy data for Most Type Order
const typeOrderData = {
  today: [60, 30, 10],
  week: [120, 80, 40],
  month: [300, 200, 100],
}
const typeOrderLabels = ['Dine In', 'To Go', 'Delivery']
const typeOrderColors = ['#65B0F6', '#FFB572', '#FF7CA3']

export default function DashboardPage() {
  const [filterStatus, setFilterStatus] = useState('All')
  const [mostOrderedPeriod, setMostOrderedPeriod] = useState('today')
  const [showAllMostOrdered, setShowAllMostOrdered] = useState(false)
  const [typeOrderPeriod, setTypeOrderPeriod] = useState('today')

  const filteredOrders = filterStatus === 'All' ? dummyOrders : dummyOrders.filter((order) => order.status === filterStatus)
  const mostOrderedToShow = showAllMostOrdered ? mostOrderedData : mostOrderedData.slice(0, 3)

  const doughnutData = {
    labels: typeOrderLabels,
    datasets: [
      {
        data: typeOrderData[typeOrderPeriod],
        backgroundColor: typeOrderColors,
        borderWidth: 0,
      },
    ],
  }

  return (
    <main className="flex h-screen bg-[#252836] text-white overflow-hidden">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten tengah */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* TOP METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1F1D2B] p-6 rounded-xl">
            <p className="text-sm text-[#ABBBC2] mb-1">Total Revenue</p>
            <p className="text-xl font-semibold">Rp.151.248.138</p>
          </div>
          <div className="bg-[#1F1D2B] p-6 rounded-xl">
            <p className="text-sm text-[#ABBBC2] mb-1">Total Dish Ordered</p>
            <p className="text-xl font-semibold">23,456</p>
          </div>
          <div className="bg-[#1F1D2B] p-6 rounded-xl">
            <p className="text-sm text-[#ABBBC2] mb-1">Total Customer</p>
            <p className="text-xl font-semibold">1,234</p>
          </div>
        </div>

        {/* ORDER REPORT */}
        <div className="bg-[#1F1D2B] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Order Report</h2>
            <div className="space-x-2">
              {['All', 'Completed', 'Pending'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`py-1 px-4 rounded-full text-sm ${
                    filterStatus === status
                      ? 'bg-[#EA7C69] text-white'
                      : 'bg-[#393C49] text-[#ABBBC2]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-[#ABBBC2] border-b border-[#393C49]">
                  <th className="py-2">Customer</th>
                  <th className="py-2">Menu</th>
                  <th className="py-2">Total Payment</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="text-sm border-b border-[#393C49]">
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.menu}</td>
                    <td className="py-3">{order.payment}</td>
                    <td className="py-3">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-medium ${
                          order.status === 'Pending'
                            ? 'bg-[#B6672B] text-white'
                            : 'bg-[#50D1AA] text-white'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-[#ABBBC2]">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Kolom kanan */}
      <div className="w-[350px] bg-[#1F1D2B] h-full p-6 flex flex-col gap-8 overflow-y-auto">
        {/* Most Ordered */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Most Ordered</h3>
            <select
              className="bg-[#393C49] text-[#ABBBC2] rounded-full px-3 py-1 text-sm outline-none"
              value={mostOrderedPeriod}
              onChange={e => setMostOrderedPeriod(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            {mostOrderedToShow.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-[#393C49]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-[#ABBBC2]">{item.ordered} dishes ordered</div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="mt-4 w-full py-2 rounded-full bg-[#EA7C69] text-white font-semibold text-sm"
            onClick={() => setShowAllMostOrdered(v => !v)}
          >
            {showAllMostOrdered ? 'Hide' : 'View All'}
          </button>
        </div>

        {/* Most Type Order */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Most Type Order</h3>
            <select
              className="bg-[#393C49] text-[#ABBBC2] rounded-full px-3 py-1 text-sm outline-none"
              value={typeOrderPeriod}
              onChange={e => setTypeOrderPeriod(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 mb-4">
              <Doughnut data={doughnutData} options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                cutout: '70%',
              }} />
            </div>
            <div className="flex flex-col gap-2 w-full">
              {typeOrderLabels.map((label, idx) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ background: typeOrderColors[idx] }} />
                  <span className="text-sm">{label}</span>
                  <span className="ml-auto text-sm font-semibold">{typeOrderData[typeOrderPeriod][idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
