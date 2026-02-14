import { MoreVertical, CirclePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetEducationsQuery,
  useGetPublicEducationsQuery,
  useDeleteEducationMutation,
} from "../../services/educationApi";
import EducationModal from "./EducationModal";

export default function EducationCard({ profileId, isOwner }) {
  const { data, isLoading } = isOwner
    ? useGetEducationsQuery()
    : useGetPublicEducationsQuery(profileId);

  const educations = data?.data || [];

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);

  const [deleteEducation, { isLoading: isDeleting }] =
    useDeleteEducationMutation();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-sm font-semibold text-gray-900">Education</h4>

          {isOwner && (
            <CirclePlus
              size={18}
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelectedEdu(null);
                setIsOpen(true);
              }}
            />
          )}
        </div>

        {educations.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                🎓
              </div>

              <div>
                <h5 className="font-medium text-gray-900">
                  {edu.degree}
                  {edu.field && ` - ${edu.field}`}
                </h5>

                <p className="text-sm text-gray-600">
                  {edu.institution}
                  {edu.location && ` • ${edu.location}`}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(edu.startYear)} —{" "}
                  {edu.isCurrentlyStudying
                    ? "Present"
                    : formatDate(edu.endYear)}
                </p>
              </div>
            </div>

            {isOwner && (
              <div className="relative">
                <MoreVertical
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() =>
                    setOpenMenuId(openMenuId === edu.id ? null : edu.id)
                  }
                />

                {openMenuId === edu.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        setSelectedEdu(edu);
                        setIsOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteTarget(edu);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isOpen && (
        <EducationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          education={selectedEdu}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="w-[420px] bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Education
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteTarget.degree}</span>{" "}
              education?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    await deleteEducation(deleteTarget.id).unwrap();
                    toast.success("Education deleted successfully");
                    setDeleteTarget(null);
                  } catch (error) {
                    toast.error(
                      error?.data?.message || "Failed to delete education",
                    );
                  }
                }}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md disabled:bg-red-300"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
