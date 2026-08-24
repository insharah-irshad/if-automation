/* Style reminder: Signal Workshop — editorial team profiles with paper/ink contrast, signal-orange accents, and a focused central profile mark. */
import { UserRound } from "lucide-react";

type TeamProfileCarouselProps = {
  role: "manager" | "developer";
};

function FemaleProfileIcon({ size = 88, strokeWidth = 1.15 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M24 88V43c0-21 11-33 26-33s26 12 26 33v45" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M34 40c0-11 6-19 16-19s16 8 16 19-6 20-16 20-16-9-16-20Z" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M34 39c4-3 8-8 10-14 6 6 13 8 22 8M33 40c-4 9-2 20 5 27M67 40c4 9 2 20-5 27" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M15 90c2-18 15-29 35-29s33 11 35 29" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M37 61l13 13 13-13" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TeamProfileCarousel({ role }: TeamProfileCarouselProps) {
  const isManager = role === "manager";
  const ProfileIcon = isManager ? UserRound : FemaleProfileIcon;
  const label = isManager ? "Muhammad Faizan manager profile" : "Insharah Irshad developer profile";

  return (
    <div className={`team-profile-visual team-profile-${role}`} aria-label={label}>
      <div className="team-profile-main" aria-hidden="true">
        <ProfileIcon size={88} strokeWidth={1.15} />
        
      </div>
    </div>
  );
}
