import { CirclePlus, Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SkillsModal from "./SkillsModal";

import {
  useGetSkillsQuery,
  useEndorseSkillMutation,
  useRemoveEndorsementMutation,
} from "../../services/skillApi";

export default function SkillsCard({ profileId, isOwner }) {
  const { data, isLoading } = useGetSkillsQuery(profileId);
  const skills = data?.data || [];

  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const [endorseSkill] = useEndorseSkillMutation();
  const [removeEndorsement] = useRemoveEndorsementMutation();

  const [poppedSkill, setPoppedSkill] = useState(null);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Skills</h4>

        {isOwner && (
          <CirclePlus
            size={18}
            className="text-gray-400 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const isEndorsed = skill.endorsements?.some(
            (e) => e.userId === user?.id,
          );

          return (
            <div
              key={skill.id}
              className={`
                flex items-center gap-3 px-4 py-2 rounded-full text-sm 
                border transition-all duration-200
                ${
                  isEndorsed
                    ? "bg-pink-50 border-pink-300 text-pink-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {/* Skill Name */}
              <span className="font-medium">{skill.name}</span>

              {/* Heart + Count */}
              <button
                disabled={isOwner}
                onClick={async () => {
                  try {
                    if (isEndorsed) {
                      await removeEndorsement(skill.id).unwrap();
                      toast.success("Endorsement removed");
                    } else {
                      await endorseSkill(skill.id).unwrap();
                      toast.success("Skill endorsed");

                      // Trigger pop animation
                      setPoppedSkill(skill.id);
                      setTimeout(() => setPoppedSkill(null), 300);
                    }
                  } catch (err) {
                    toast.error(err?.data?.message || "Action failed");
                  }
                }}
                className="flex items-center gap-1"
              >
                <ThumbsUp
                  size={16}
                  className={`
                    transition-transform duration-300
                    ${poppedSkill === skill.id ? "scale-150" : "scale-100"}
                    ${
                      isEndorsed
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-400"
                    }
                  `}
                />

                <span className="text-xs">
                  {skill._count?.endorsements || 0}
                </span>
              </button>
            </div>
          );
        })}
      </div>
      {isOpen && (
        <SkillsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          skills={skills}
          isOwner={isOwner}
        />
      )}
    </div>
  );
}
