import { Pencil, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useGetEducationsQuery } from "../../services/educationApi";
import EducationModal from "./EducationModal";

export default function EducationCard() {
  const { data, isLoading } = useGetEducationsQuery();
  const educations = data?.data || [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);

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

          <CirclePlus
            size={18}
            className="text-gray-400 cursor-pointer"
            onClick={() => {
              setSelectedEdu(null);
              setIsOpen(true);
            }}
          />
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
                  {edu.institution}, {edu.location}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(edu.startYear)} —{" "}
                  {edu.isCurrentlyStudying
                    ? "Present"
                    : formatDate(edu.endYear)}
                </p>
              </div>
            </div>

            <Pencil
              size={16}
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelectedEdu(edu);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <EducationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          education={selectedEdu}
        />
      )}
    </>
  );
}
