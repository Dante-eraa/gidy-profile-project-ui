import { useState } from "react";
import {
  useGetSocialLinksQuery,
  useUpdateSocialLinkMutation,
  useDeleteSocialLinkMutation,
} from "../../services/socialLinkApi";
import { Check, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function EditSocialLinkModal({ isOpen, onClose }) {
  const { data } = useGetSocialLinksQuery();
  const [updateSocial] = useUpdateSocialLinkMutation();
  const [deleteSocial] = useDeleteSocialLinkMutation();

  const socials = data?.data || [];

  const [editedLinks, setEditedLinks] = useState({});

  if (!isOpen) return null;

  const handleChange = (id, value) => {
    setEditedLinks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateSocial({
        id,
        url: editedLinks[id],
      }).unwrap();

      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSocial(id).unwrap();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-6 text-gray-800">
          Edit Social Links
        </h2>

        {/* Social List */}
        <div className="space-y-5">
          {socials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-gray-50 rounded-md p-2"
            >
              {/* Platform */}
              <div className="text-sm text-gray-600 sm:w-28">
                {item.platform}
              </div>

              {/* Input */}
              <input
                type="text"
                defaultValue={item.url}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="w-full sm:flex-1 h-[38px] px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0059D6]"
              />

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-2 justify-around ">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="p-2 text-green-500 hover:text-green-600"
                >
                  <Check size={18} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            CANCEL
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md text-sm bg-sky-100 text-sky-500 hover:bg-sky-200"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
