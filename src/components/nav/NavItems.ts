export interface NavItem {
    icon: string;
    text: string;
    link: string;
    tag?: string;
}

export const navItems: NavItem[] = [
    {
        icon: "icons/Home",
        text: "Home",
        link: "/",
    },
    {
        icon: "icons/Character",
        text: "Characters",
        link: "/characters/",
    },
    {
        icon: "icons/Lightcone",
        text: "Light Cones",
        link: "/lightcones/",
    },
    {
        icon: "icons/Relic",
        text: "Relics",
        link: "/relics/",
    },
    {
        icon: "icons/Ascension",
        text: "Ascension Planner",
        link: "/planner/",
    },
    {
        icon: "icons/Warp",
        text: "Banner Archive",
        link: "/banners/",
    },
];

export const otherItems: NavItem[] = [
    {
        text: "Calendar",
        link: "https://irminsul.gg/calendar",
        icon: "",
    },
    {
        text: "Blog",
        link: "https://irminsul.gg/blog",
        icon: "",
    },
];
