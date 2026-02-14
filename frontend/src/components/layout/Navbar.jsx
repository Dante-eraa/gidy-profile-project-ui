import { useGetProfileQuery } from "../../services/profileApi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { User, LogOut, ChevronDown } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useGetProfileQuery();

  const profile = data?.data;

  const profileImage = profile?.profileImage;
  const firstName = profile?.firstName || profile?.fullName || "";
  const slug = profile?.slug;
  const avatarLetter = firstName.charAt(0).toUpperCase();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <header className="bg-white  border-0">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <img
              src="	https://d2d0jobwzy0nc3.cloudfront.net/static/Gidy_logo_full_transparent"
              alt="logo"
              className="w-23"
            />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-black">
              Jobs
            </a>
            <a href="#" className="hover:text-black">
              Hackathons
            </a>
            <a href="#" className="hover:text-black">
              Projects
            </a>
            <a href="#" className="hover:text-black">
              Tasks
            </a>
            <a href="#" className="hover:text-black">
              Organization
            </a>
          </nav>
        </div>

        {/* Profile Avatar */}
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          {/* Avatar (no click here) */}
          <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-[#0059d6] text-white font-medium">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              avatarLetter
            )}
          </div>

          {/* Chevron (ONLY this opens dropdown) */}
          <ChevronDown
            size={16}
            className={`text-gray-500 cursor-pointer transition-transform ${
              open ? "rotate-180" : ""
            }`}
            onClick={() => setOpen((prev) => !prev)}
          />

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={() => {
                  navigate(`/profile/${slug}`);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>Profile</span>
                <User size={16} className="text-blue-500" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <span>Logout</span>
                <LogOut size={16} className="text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
