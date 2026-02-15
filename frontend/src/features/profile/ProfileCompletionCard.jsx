import { CheckCircle, PlusCircle } from "lucide-react";
import { useState } from "react";

import EducationModal from "../education/EducationModal";
import SkillsModal from "../skill/SkillsModal";
import ExperienceModal from "../experience/ExperienceModal";
import CertificationModal from "../certificate/CertificationModal";

export default function ProfileCompletionCard({ profile }) {
  if (!profile) return null;

  const totalSections = 6;
  let completed = 0;

  const missingSections = [];

  // ✅ Basic Profile
  if (
    profile.firstName &&
    profile.lastName &&
    profile.location &&
    profile.bio
  ) {
    completed++;
  } else {
    missingSections.push("BASIC");
  }

  // ✅ Career Vision
  if (profile.careerVision) {
    completed++;
  } else {
    missingSections.push("CAREER");
  }

  // ✅ Experience
  if (profile.experiences?.length > 0) {
    completed++;
  } else {
    missingSections.push("EXPERIENCE");
  }

  // ✅ Education
  if (profile.educations?.length > 0) {
    completed++;
  } else {
    missingSections.push("EDUCATION");
  }

  // ✅ Skills
  if (profile.skills?.length > 0) {
    completed++;
  } else {
    missingSections.push("SKILL");
  }

  // ✅ Certification
  if (profile.certifications?.length > 0) {
    completed++;
  } else {
    missingSections.push("CERTIFICATION");
  }

  const percentage = Math.round((completed / totalSections) * 100);
  const isComplete = percentage === 100;

  const firstMissing = missingSections[0];

  const [openModal, setOpenModal] = useState(null);

  const getSuggestionText = () => {
    switch (firstMissing) {
      case "EXPERIENCE":
        return "Add Your Experience 💼";
      case "EDUCATION":
        return "Add Your Education 🎓";
      case "SKILL":
        return "Add Your Skills ⚡";
      case "CERTIFICATION":
        return "Upload Your Certificates 📜";
      case "CAREER":
        return "Add Career Vision 🎯";
      case "BASIC":
        return "Complete Basic Profile 👤";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {isComplete ? (
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Profile Completed
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Mission complete! Profile at 100% and you're good to go!
            </p>
          </div>

          <CheckCircle className="text-green-500" size={22} />
        </div>
      ) : (
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            🎓 Level Up Profile
          </h4>

          <p className="text-sm text-gray-500 mt-1">
            Just a few clicks away from awesomeness!
          </p>

          <p className="text-xs text-gray-400 mt-4">Progress: {percentage}%</p>

          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {firstMissing && (
            <div
              onClick={() => setOpenModal(firstMissing)}
              className="mt-4 bg-gray-50 hover:bg-gray-100 cursor-pointer p-3 rounded-lg flex justify-between items-center transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {getSuggestionText()}
                </p>
                <p className="text-xs text-gray-400">
                  Click to complete this section.
                </p>
              </div>

              <PlusCircle size={18} className="text-blue-500" />
            </div>
          )}
        </div>
      )}

      {/* MODALS */}
      {openModal === "EXPERIENCE" && (
        <ExperienceModal isOpen={true} onClose={() => setOpenModal(null)} />
      )}

      {openModal === "EDUCATION" && (
        <EducationModal isOpen={true} onClose={() => setOpenModal(null)} />
      )}

      {openModal === "SKILL" && (
        <SkillsModal
          isOpen={true}
          onClose={() => setOpenModal(null)}
          skills={profile.skills}
          isOwner={true}
        />
      )}

      {openModal === "CERTIFICATION" && (
        <CertificationModal isOpen={true} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}
