import { CheckCircle } from "lucide-react";

export default function ProfileCompletionCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            Profile Completed
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Mission complete! Profile at 100% and you're good to go!
          </p>
        </div>

        <CheckCircle className="text-green-500" size={20} />
      </div>
    </div>
  );
}
