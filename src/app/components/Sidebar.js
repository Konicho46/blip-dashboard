// app/components/Sidebar.js
"use client";
import {
  Home,
  PieChart,
  Settings,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[80px] bg-[#1F1D2B] flex flex-col items-center py-6 gap-6 text-yellow-400">
      {/* Home */}
      <a
        href="/"
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${
          pathname === "/" ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"
        }`}
      >
        <Home size={20} />
      </a>

      {/* Dashboard */}
      <a
        href="/dashboard/"
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${
          pathname.startsWith("/dashboard") ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"
        }`}
      >
        <PieChart size={20} />
      </a>

      {/* Settings */}
      <a
        href="/settings"
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition ${
          pathname === "/settings" ? "bg-yellow-400 text-black" : "hover:bg-yellow-400 hover:text-black"
        }`}
      >
        <Settings size={20} />
      </a>

      <div className="flex-1" />

      {/* Logout */}
      <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-yellow-400 hover:text-black transition">
        <LogOut size={20} />
      </div>
    </aside>
  );
}
