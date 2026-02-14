import { CheckCircle, PlusCircle } from "lucide-react";

export default function ProfileCompletionCard({ profile }) {
  if (!profile) return null;

  // 🔢 Total sections to check
  const totalSections = 6;

  let completed = 0;

  // ✅ Basic Profile
  if (
    profile.firstName &&
    profile.lastName &&
    profile.location &&
    profile.bio
  ) {
    completed++;
  }

  // ✅ Career Vision
  if (profile.careerVision) completed++;

  // ✅ Experience
  if (profile.experiences?.length > 0) completed++;

  // ✅ Education
  if (profile.educations?.length > 0) completed++;

  // ✅ Skills
  if (profile.skills?.length > 0) completed++;

  // ✅ Certification
  if (profile.certifications?.length > 0) completed++;

  const percentage = Math.round((completed / totalSections) * 100);

  const isComplete = percentage === 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {isComplete ? (
        // ✅ COMPLETED UI
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
            Just a few clicks away from awesomeness, complete your profile!
          </p>

          {/* Progress Text */}
          <p className="text-xs text-gray-400 mt-4">Progress: {percentage}%</p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Suggestion Example */}
          {percentage < 100 && (
            <div className="mt-4 bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Upload Your Certificates 📜
                </p>
                <p className="text-xs text-gray-400">
                  Boost your profile with relevant certifications.
                </p>
              </div>

              <PlusCircle size={18} className="text-blue-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
