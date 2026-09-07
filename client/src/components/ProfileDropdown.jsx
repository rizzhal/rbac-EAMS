import React from "react";
import {
  Store,
  BookOpen,
  Network,
  Settings,
  LogOut,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

const DropdownItem = ({ icon, label }) => {
  return (
    <button
      className="
        flex w-full items-center gap-4
        px-6 py-3
        text-gray-500
        transition
        hover:bg-gray-50
        hover:text-gray-900
      "
    >
      {icon}

      <span className="text-base font-medium">
        {label}
      </span>
    </button>
  );
};

const ProfileDropdown = () => {
  return (
    <div className="relative group">
      {/* Profile button */}
      <button className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </button>

      {/* Dropdown */}
      <div
        className="
          absolute right-0 top-12 z-50
          w-97.5
          rounded-2xl
          border border-gray-200
          bg-white
          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          
          opacity-0
          invisible
          translate-y-2
          scale-95
          
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
          group-hover:scale-100
          
          transition-all duration-200
          origin-top-right
        "
      >
        {/* User information */}
        <div className="flex items-center gap-4 px-6 py-5">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Devon Lane"
            className="h-14 w-14 rounded-full object-cover"
          />

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Devon Lane
            </h3>

            <p className="text-base text-gray-500">
              info@example.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-200" />

        {/* Theme selector */}
        <div className="mx-6 my-4 flex h-12 rounded-xl bg-gray-100 p-1">
          <button
            className="
              flex flex-1 items-center justify-center
              rounded-lg
              bg-white
              text-purple-600
              shadow-sm
            "
          >
            <Sun size={22} />
          </button>

          <button
            className="
              flex flex-1 items-center justify-center
              text-gray-500
              hover:text-gray-800
            "
          >
            <Moon size={22} />
          </button>

          <button
            className="
              flex flex-1 items-center justify-center
              text-gray-500
              hover:text-gray-800
            "
          >
            <Monitor size={22} />
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-200" />

        {/* Menu items */}
        <div className="py-3">
          <DropdownItem
            icon={<Store size={22} />}
            label="Your Shop"
          />

          <DropdownItem
            icon={<BookOpen size={22} />}
            label="Documentation"
          />

          <DropdownItem
            icon={<Network size={22} />}
            label="Affiliate"
          />

          <DropdownItem
            icon={<Settings size={22} />}
            label="Settings"
          />
        </div>

        {/* Divider */}
        <div className="mx-4 border-t border-gray-200" />

        {/* Logout */}
        <div className="p-3">
          <button
            className="
              flex w-full items-center gap-4
              rounded-xl
              px-4 py-3
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <LogOut size={22} />
            <span className="text-base">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};



export default ProfileDropdown;