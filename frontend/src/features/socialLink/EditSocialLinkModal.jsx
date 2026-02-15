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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[600px] bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Edit Socials</h2>

        <div className="space-y-4">
          {socials.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              {/* Platform Name */}
              <div className="w-28 text-sm text-gray-600">{item.platform}</div>

              {/* URL Input */}
              <input
                type="text"
                defaultValue={item.url}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="flex-1 h-[36px] px-3 border rounded-md bg-gray-50 text-sm focus:outline-none focus:border-[#0059D6]"
              />

              {/* Save */}
              <button
                onClick={() => handleUpdate(item.id)}
                className="text-green-500 hover:text-green-600"
              >
                <Check size={18} />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            CANCEL
          </button>

          <button
            onClick={onClose}
            className=" px-5 py-2 rounded-md text-sm bg-sky-100
                    text-sky-400
                    hover:bg-sky-200"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
