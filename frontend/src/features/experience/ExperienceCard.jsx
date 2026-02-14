import { Pencil, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useGetExperiencesQuery } from "../../services/experienceApi";
import ExperienceModal from "./ExperienceModal";

export default function ExperienceCard() {
  const { data, isLoading } = useGetExperiencesQuery();
  const experiences = data?.data || [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-sm font-semibold text-gray-900">Experience</h4>
          <CirclePlus
            size={18}
            className="text-gray-400 cursor-pointer"
            onClick={() => {
              setSelectedExp(null);
              setIsOpen(true);
            }}
          />
        </div>

        {experiences.map((exp) => (
          <div key={exp._id} className="flex justify-between items-start mb-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 font-semibold">
                🏢
              </div>

              <div>
                <h5 className="font-medium text-gray-900">{exp.title}</h5>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.isCurrentlyWorking
                    ? "Present"
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString()
                      : ""}
                </p>
              </div>
            </div>

            <Pencil
              size={16}
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                setSelectedExp(exp);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <ExperienceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          experience={selectedExp}
        />
      )}
    </>
  );
}
