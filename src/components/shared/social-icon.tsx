import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { SiKaggle, SiMedium } from "react-icons/si";

import type { SocialLink } from "@/types";

const iconMap: Record<SocialLink["icon"], React.ComponentType<{ className?: string }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  kaggle: SiKaggle,
  medium: SiMedium,
  twitter: FiTwitter,
};

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  const Icon = iconMap[icon];
  return <Icon className={className} />;
}
