import { Copy, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ShareProfileModal({ isOpen, onClose, slug }) {
  if (!isOpen) return null;

  const profileUrl = `${window.location.origin}/profile/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold text-gray-500 mb-4">
          Share Profile
        </h3>

        <div className="flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-gray-50">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />

          <button
            onClick={handleCopy}
            className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
          >
            <Copy size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Share your public profile link with others.
        </p>
      </div>
    </div>
  );
}
