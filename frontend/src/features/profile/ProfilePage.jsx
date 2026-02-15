import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPublicProfileQuery } from "../../services/profileApi";

import ProfileHeroCard from "./ProfileHeroCard";
import CareerVisionCard from "./CareerVisionCard";
import EducationCard from "../education/EducationCard";
import ExperienceCard from "../experience/ExperienceCard";
import SkillsCard from "../skill/SkillsCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import CertificationCard from "../certificate/CertificationCard";

export default function ProfilePage() {
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetPublicProfileQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  const profile = data?.data;

  const isOwner = user?.profile?.slug === slug;

  return (
    <div className="space-y-2">
      <ProfileHeroCard
        profile={profile}
        email={isOwner ? user?.email : null}
        isOwner={isOwner}
      />

      <CareerVisionCard
        careerVision={profile?.careerVision}
        isOwner={isOwner}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          {isOwner && <ProfileCompletionCard profile={profile} />}

          <SkillsCard profileId={profile?.id} isOwner={isOwner} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          <ExperienceCard profileId={profile?.id} isOwner={isOwner} />

          <EducationCard profileId={profile?.id} isOwner={isOwner} />

          <CertificationCard profileId={profile?.id} isOwner={isOwner} />
        </div>
      </div>
    </div>
  );
}
