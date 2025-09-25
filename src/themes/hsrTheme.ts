import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(15, 15, 15)", "rgb(30, 30, 30)", "rgb(26, 22, 24)"];

const border = {
    color: "rgb(168, 147, 105)",
    highlight: `rgb(233, 194, 39)`,
};

const backgroundColors = [
    {
        main: "rgb(26, 22, 24)",
        light: "rgb(36, 32, 34)",
        dark: "rgb(16, 12, 14)",
    },
    {
        main: "rgb(30, 30, 30)",
        light: "rgb(40, 40, 40)",
        dark: "rgb(20, 20, 20)",
    },
    {
        main: "rgb(15, 15, 15)",
        light: "rgb(25, 25, 25)",
        dark: "rgb(5, 5, 5)",
    },
];

export const hsrThemeData = {
    name: "HSR",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImageColors: ["rgb(2, 16, 48)", "rgba(101, 135, 141, 0.2)"],
    backgroundImageURL:
        "https://assets.irminsul.gg/hsr/images/HSR_Background.png",
    backgroundImageAlpha: 0.5,
    palette: {
        primary: {
            main: "rgb(15, 15, 15)",
        },
        secondary: {
            main: "rgb(30, 30, 30)",
        },
        tertiary: {
            main: "rgb(26, 22, 24)",
            light: "rgb(36, 32, 34)",
            dark: "rgb(16, 12, 14)",
        },
        info: {
            main: "rgb(150, 126, 74)",
        },
        divider: border.color,
    },
    font: {
        main: {
            family: "DIN, Roboto, sans-serif",
            weight: 600,
        },
        styled: {
            family: "DIN, Roboto, sans-serif",
            weight: 600,
        },
        element: {
            weight: 600,
        },
        highlight: {
            weight: 600,
        },
        sizes: {
            "h4-styled": {
                xs: 26,
                sm: 28,
            },
            "h5-styled": {
                xs: 22,
                sm: 24,
            },
            "h6-styled": {
                xs: 18,
                sm: 20,
            },
            "body1-styled": {
                xs: 14,
                sm: 16,
            },
            "subtitle1-styled": {
                xs: 13,
                sm: 15,
            },
            "body2-styled": {
                xs: 12,
                sm: 14,
            },
            "subtitle2-styled": {
                xs: 11,
                sm: 13,
            },
            h4: {
                xs: 26,
                sm: 28,
            },
            h5: {
                xs: 22,
                sm: 24,
            },
            h6: {
                xs: 18,
                sm: 20,
            },
            body1: {
                xs: 14,
                sm: 16,
            },
            subtitle1: {
                xs: 13,
                sm: 15,
            },
            body2: {
                xs: 12,
                sm: 14,
            },
            subtitle2: {
                xs: 11,
                sm: 13,
            },
        },
    },
    text: {
        primary: "rgb(255, 255, 255)",
        contrast: "rgb(0, 0, 0)",
        selected: "rgb(219, 191, 145)",
        description: "rgb(205, 205, 205)",
        highlight: "#F29E38",
        highlight2: "#DCC491",
        special: "#F9B0F0",
        star: "rgb(255, 208, 112)",
        header: "#F29E38",
        refinement: "#F29E38",
        value: "#F29E38",
        physical: "#A8A8A8",
        fire: "#E62A29",
        ice: "#07A0FF",
        lightning: "#B54BD3",
        wind: "#42C38C",
        quantum: "#6778FD",
        imaginary: "#E5B909",
    },
    appbar: {
        backgroundColor: appbarColors[0],
        hover: appbarColors[1],
        selectedHover: appbarColors[2],
        color: "rgb(255, 255, 255)",
    },
    border: {
        color: {
            primary: border.color,
            highlight: border.highlight,
        },
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[2].main,
    },
    icon: {
        backgroundColor: appbarColors[1],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1].main,
    },
    menu: {
        primary: backgroundColors[0].dark,
        hover: backgroundColors[0].light,
        selected: backgroundColors[1].dark,
        selectedHover: backgroundColors[1].light,
    },
    table: {
        body: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
        },
    },
};

export const hsrTheme = createTheme(hsrThemeData);
