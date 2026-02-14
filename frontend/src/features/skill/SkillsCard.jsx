import { Plus } from "lucide-react";

export default function SkillsCard() {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "SQL",
    "MySQL",
    "MongoDB",
    "Docker",
    "Azure",
    "HTML",
    "CSS",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Skills</h4>
        <Plus size={18} className="text-gray-400 cursor-pointer" />
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs bg-gray-100 rounded-full border text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
