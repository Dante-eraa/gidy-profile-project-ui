import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCreateSkillMutation,
  useDeleteSkillMutation,
} from "../../services/skillApi";

export default function SkillsModal({ isOpen, onClose, skills = [], isOwner }) {
  const [skillInput, setSkillInput] = useState("");

  const [createSkill, { isLoading: isCreating }] = useCreateSkillMutation();

  const [deleteSkill, { isLoading: isDeleting }] = useDeleteSkillMutation();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleAddSkill = async () => {
    if (!skillInput.trim()) return;

    try {
      await createSkill({ name: skillInput }).unwrap();
      toast.success("Skill added successfully");
      setSkillInput("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add skill");
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id).unwrap();
      toast.success("Skill removed successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove skill");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-[600px] bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>

        {/* Skill Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {skill.name}

              {isOwner && (
                <X
                  size={14}
                  className="cursor-pointer text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteSkill(skill.id)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        {isOwner && (
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add a skill"
            className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
        )}

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          {isOwner && (
            <button
              onClick={handleAddSkill}
              disabled={isCreating}
              className=" text-sm px-5 py-2 rounded-md bg-sky-100
                    text-sky-400
                    hover:bg-sky-200
                    disabled:bg-sky-300"
            >
              {isCreating ? "Adding..." : "Add"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
