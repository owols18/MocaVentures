export type NavigationItem = {
  label: string;
  href: string;
  desktopMenuVariant?: "compact";
};

export const primaryNavigation: NavigationItem[] = [
  { label: "ABOUT", href: "/about" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "TEAM", href: "/team" },
  {
    label: "WHO WE WORK WITH",
    href: "/who-we-work-with",
    desktopMenuVariant: "compact",
  },
  { label: "LET'S TALK", href: "/lets-talk" },
];

export const mobilePrimaryNavigation: NavigationItem[] = [
  { label: "HOME", href: "/" },
  { label: "PORTFOLIO", href: "/portfolio" },
  { label: "ABOUT", href: "/about" },
  { label: "LET'S TALK", href: "/lets-talk" },
];

export const mobileMoreNavigation: NavigationItem[] = [
  { label: "TEAM", href: "/team" },
  { label: "WHO WE WORK WITH", href: "/who-we-work-with" },
];
