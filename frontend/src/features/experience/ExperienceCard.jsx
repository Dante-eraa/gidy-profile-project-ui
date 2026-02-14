import { MoreVertical, CirclePlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetExperiencesQuery,
  useGetPublicExperiencesQuery,
  useDeleteExperienceMutation,
} from "../../services/experienceApi";
import ExperienceModal from "./ExperienceModal";

export default function ExperienceCard({ profileId, isOwner }) {
  const { data, isLoading } = isOwner
    ? useGetExperiencesQuery()
    : useGetPublicExperiencesQuery(profileId);

  const experiences = data?.data || [];

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  const [deleteExperience, { isLoading: isDeleting }] =
    useDeleteExperienceMutation();

  const formatEmploymentType = (type) => {
    if (!type) return "";
    return type
      .replace("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-sm font-semibold text-gray-900">Experience</h4>

          {isOwner && (
            <CirclePlus
              size={18}
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelectedExp(null);
                setIsOpen(true);
              }}
            />
          )}
        </div>

        {experiences.map((exp) => (
          <div key={exp.id} className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 font-semibold">
                🏢
              </div>

              <div>
                <h5 className="font-medium text-gray-900">{exp.title}</h5>

                <p className="text-sm text-gray-600">
                  {exp.company}
                  {exp.employmentType &&
                    ` • ${formatEmploymentType(exp.employmentType)}`}
                  {exp.location && ` • ${exp.location}`}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  –{" "}
                  {exp.isCurrentlyWorking
                    ? "Present"
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                </p>
              </div>
            </div>

            {isOwner && (
              <div className="relative">
                <MoreVertical
                  size={18}
                  className="text-gray-400 cursor-pointer"
                  onClick={() =>
                    setOpenMenuId(openMenuId === exp.id ? null : exp.id)
                  }
                />

                {openMenuId === exp.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button
                      onClick={() => {
                        setSelectedExp(exp);
                        setIsOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setDeleteTarget(exp);
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
        <ExperienceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          experience={selectedExp}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
          <div className="w-[420px] bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Experience
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{deleteTarget.title}</span>{" "}
              experience?
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
                    await deleteExperience(deleteTarget.id).unwrap();
                    toast.success("Experience deleted successfully");
                    setDeleteTarget(null);
                  } catch (error) {
                    toast.error(
                      error?.data?.message || "Failed to delete experience",
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
