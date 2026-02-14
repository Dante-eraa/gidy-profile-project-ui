import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../services/profileApi";
import { useGetCareerVisionQuery } from "../../services/careerVisionApi";

import ProfileHeroCard from "./ProfileHeroCard";
import CareerVisionCard from "./CareerVisionCard";
import EducationCard from "../education/EducationCard";
import ExperienceCard from "../experience/ExperienceCard";
import SkillsCard from "../skill/SkillsCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import CertificationCard from "../certificate/CertificationCard";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();

  const { data: careerData } = useGetCareerVisionQuery();

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <ProfileHeroCard profile={profileData?.data} email={user?.email} />
      <CareerVisionCard careerVision={careerData?.data} />{" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          <ProfileCompletionCard />
          <SkillsCard />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          <ExperienceCard />
          <EducationCard />
          <CertificationCard />
        </div>
      </div>
    </div>
  );
}
