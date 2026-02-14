import { Sparkles } from "lucide-react";

export default function CareerVisionCard({ careerVision }) {
  if (!careerVision) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">You're Career Vision</p>
          <h3 className="text-xl font-semibold text-gray-900 mt-1">
            {careerVision.careerGoal}
          </h3>
        </div>

        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
          <Sparkles size={18} className="text-orange-500" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-5" />

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="text-gray-400 mb-1">
            What you're growing into right now
          </p>
          <p className="font-medium text-gray-800">
            {careerVision.growingInto}
          </p>
        </div>

        <div>
          <p className="text-gray-400 mb-1">The space you want to grow in</p>
          <p className="font-medium text-gray-800">
            {careerVision.growthSpace}
          </p>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Inspired by</p>
          <p className="font-medium text-gray-800">{careerVision.inspiredBy}</p>
        </div>
      </div>
    </div>
  );
}
