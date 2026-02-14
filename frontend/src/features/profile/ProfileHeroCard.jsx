import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  User,
  Download,
  Share2,
  Instagram,
  Target,
  Settings,
} from "lucide-react";

export default function ProfileHeroCard({ profile, email }) {
  if (!profile) return null;
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function DropdownItem({ icon, label }) {
    return (
      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
        <span className="text-blue-500">{icon}</span>
        {label}
      </button>
    );
  }

  return (
    <div className="relative bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-full">
      {/* ================= TOP SECTION ================= */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start text-center md:text-left w-full">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#0059d6] text-white flex items-center justify-center text-2xl font-semibold overflow-hidden flex-shrink-0">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              profile.firstName?.charAt(0).toUpperCase()
            )}
          </div>

          {/* Name + Details */}
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 break-words">
              {profile.firstName} {profile.lastName}
              {profile.role && (
                <span className="block md:inline text-sm text-gray-500 md:ml-2 font-normal">
                  ({profile.role})
                </span>
              )}
            </h2>

            {profile.location && (
              <p className="text-sm text-gray-500 mt-1">{profile.location}</p>
            )}

            {profile.bio && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MoreVertical size={20} className="text-gray-500" />
          </button>
        </div>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50"
          >
            <DropdownItem icon={<User size={16} />} label="Edit Profile" />
            <DropdownItem icon={<Share2 size={16} />} label="Share Profile" />
            <DropdownItem icon={<Instagram size={16} />} label="Add Socials" />
            <DropdownItem icon={<Target size={16} />} label="Career Vision" />
            <DropdownItem icon={<Settings size={16} />} label="Settings" />
          </div>
        )}
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-6 w-full">
        {/* Email + Resume */}
        <div className="w-full md:w-auto text-center md:text-left">
          <p className="text-sm text-blue-600 break-all">{email}</p>

          {
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm hover:bg-blue-200 transition"
            >
              <Download size={16} />
              Download Resume
            </a>
          }
        </div>

        {/* League Section */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
          {/* League Box */}
          <div className="w-full md:w-auto bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-sm">
            {/* Placeholder League Icon */}
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex-shrink-0" />

            <div className="flex gap-6">
              <div>
                <p className="text-gray-400 text-xs">League</p>
                <p className="font-medium text-gray-800">Bronze</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Rank</p>
                <p className="font-medium text-gray-800">24</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs">Points</p>
                <p className="font-medium text-gray-800">100</p>
              </div>
            </div>
          </div>

          <button className="text-orange-500 text-sm font-medium hover:underline">
            View My Rewards →
          </button>
        </div>
      </div>
    </div>
  );
}
