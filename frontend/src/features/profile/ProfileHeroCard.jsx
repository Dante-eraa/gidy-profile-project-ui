import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  User,
  Download,
  Share2,
  Instagram,
  Target,
  Settings,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Pencil,
  Mail,
  ChevronRight,
} from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import CareerVisionModal from "../careerVision/CareerVisionModal";
import SocialLinkModal from "../socialLink/SocialLinkModal";
import { useGetSocialLinksQuery } from "../../services/socialLinkApi";
import EditSocialLinkModal from "../socialLink/EditSocialLinkModal";
import ShareProfileModal from "./ShareProfileModal";

export default function ProfileHeroCard({ profile, email, isOwner }) {
  if (!profile) return null;
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isEditSocialOpen, setIsEditSocialOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const { data: socialData } = useGetSocialLinksQuery(undefined, {
    skip: !isOwner,
  });
  const getIcon = (platform) => {
    switch (platform) {
      case "LINKEDIN":
        return <Linkedin size={18} />;
      case "GITHUB":
        return <Github size={18} />;
      case "TWITTER":
        return <Twitter size={18} />;
      case "PORTFOLIO":
        return <Globe size={18} />;
      default:
        return <Globe size={18} />;
    }
  };
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function DropdownItem({ icon, label, onClick }) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
      >
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
                <span className="block md:inline text-sm text-gray-700 md:ml-2 font-normal">
                  ({formatRole(profile.role)})
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

            {socialData?.data?.length > 0 && (
              <div className="flex gap-3 mt-3 justify-center md:justify-start">
                {socialData.data.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#0059d6] transition"
                  >
                    {getIcon(item.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Button */}
        {/* RIGHT ACTIONS */}
        <div className="flex  gap-3 ml-auto">
          {/* Social Icons */}
          {socialData?.data?.length > 0 &&
            socialData.data.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0059d6] transition p-2"
              >
                {getIcon(item.platform)}
              </a>
            ))}

          {/* More Menu */}
          {isOwner && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
          )}
        </div>

        {isOwner && open && (
          <div
            ref={menuRef}
            className="absolute right-0 lg:-right-20 top-10 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50"
          >
            <DropdownItem
              icon={<User size={16} />}
              label="Edit Profile"
              onClick={() => {
                setOpen(false);
                setIsEditOpen(true);
              }}
            />
            <DropdownItem
              icon={<Share2 size={16} />}
              label="Share Profile"
              onClick={() => {
                setOpen(false);
                setIsShareOpen(true);
              }}
            />

            <DropdownItem
              icon={<Instagram size={16} />}
              label="Add Socials"
              onClick={() => {
                setOpen(false);
                setIsSocialOpen(true);
              }}
            />
            <DropdownItem
              icon={<Pencil size={16} />}
              label="Edit Social Links"
              onClick={() => {
                setOpen(false);
                setIsEditSocialOpen(true);
              }}
            />
            <DropdownItem
              icon={<Target size={16} />}
              label="Career Vision"
              onClick={() => {
                setOpen(false);
                setIsCareerOpen(true);
              }}
            />
            <DropdownItem icon={<Settings size={16} />} label="Settings" />
          </div>
        )}
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-6 w-full">
        {/* Email + Resume */}
        <div className="w-full md:w-auto text-center md:text-left">
          <p className="text-md text-blue-600 break-all flex gap-2 items-center ">
            {isOwner && <Mail className="w-5" />}
            {email}
          </p>

          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl.replace(
                "/upload/",
                "/upload/fl_attachment/",
              )}
              download
              className="inline-flex items-center gap-2 mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm hover:bg-blue-200 transition"
            >
              <Download size={16} />
              Download Resume
            </a>
          )}
        </div>

        {/* League Section */}
        <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-3">
          {/* League Box */}
          <div className="w-full md:w-auto bg-gray-50 border border-gray-200 rounded-md px-2 py-0 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-sm">
            {/* Placeholder League Icon */}
            <div>
              {" "}
              <img
                className="h-15"
                src="https://d2d0jobwzy0nc3.cloudfront.net/leagues/league-mhabbrl1lralz2?v=1771063753561"
                alt="League Logo"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-1 items-center">
                <p className="text-gray-400 text-xs">League</p>
                <p className="font-normal text-lg text-gray-800">Bronze</p>
              </div>

              <div className="flex flex-col gap-1 items-center">
                <p className="text-gray-400 text-xs">Rank</p>
                <p className="font-normal text-lg text-gray-800">24</p>
              </div>

              <div className="flex flex-col gap-1 items-center">
                <p className="text-gray-400 text-xs">Points</p>
                <p className="font-normal text-lg text-gray-800">100</p>
              </div>
            </div>
          </div>

          <button className="text-[#fdb100] text-sm font-normal hover:underline flex items-center gap-1">
            View My Rewards <ChevronRight className="w-4" />
          </button>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        profile={profile}
      />
      <CareerVisionModal
        isOpen={isCareerOpen}
        onClose={() => setIsCareerOpen(false)}
      />
      <SocialLinkModal
        isOpen={isSocialOpen}
        onClose={() => setIsSocialOpen(false)}
      />
      <EditSocialLinkModal
        isOpen={isEditSocialOpen}
        onClose={() => setIsEditSocialOpen(false)}
        editMode={true}
      />
      <ShareProfileModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        slug={profile.slug}
      />
    </div>
  );
}
