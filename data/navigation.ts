export type NavigationItem = {
  label: string;
  href: string;
  desktopMenuVariant?: "compact";
};

export const primaryNavigation: NavigationItem[] = [
  { label: "ABOUT", href: "/about" },
  { label: "IMPACT", href: "/impact" },
  { label: "PROJECTS", href: "/portfolio" },
  { label: "TEAM", href: "/team" },
  { label: "CONTACT US", href: "/lets-talk" },
];

export const mobilePrimaryNavigation: NavigationItem[] = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/portfolio" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT US", href: "/lets-talk" },
];

export const mobileMoreNavigation: NavigationItem[] = [
  { label: "IMPACT", href: "/impact" },
  { label: "TEAM", href: "/team" },
];
