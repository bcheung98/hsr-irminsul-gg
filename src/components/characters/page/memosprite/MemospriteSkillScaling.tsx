import { useEffect, useState } from "react";

// Component imports
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";
import { getElementColor } from "helpers/elementColors";

// Type imports
import { MemospriteSkillScalingProps } from "./MemospriteSkillTab";

function MemospriteSkillScaling({
    skillData,
    element,
}: MemospriteSkillScalingProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("md"));

    const maxLevel = 10;
    const [sliderValue, setSliderValue] = useState(6);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const levels = range(1, maxLevel);
    const scaling = skillData
        .map((skill) => (skill.scaling !== undefined ? skill.scaling : []))
        .flat();
    const targets = document.getElementsByClassName("memosprite-skill-value");
    useEffect(() => {
        scaling.forEach((subScaling: string[], index: number) => {
            let target = targets[index];
            if (target) {
                target.innerHTML = subScaling[sliderValue - 1];
            }
        });
    }, [skillData, sliderValue]);

    return (
        <FlexBox
            sx={{
                flexWrap: { xs: "wrap", md: "nowrap" },
                mb: "16px",
            }}
        >
            <TextStyled sx={{ minWidth: "60px" }}>
                Lv. {levels[sliderValue - 1]}
            </TextStyled>
            <StyledSlider
                value={sliderValue}
                step={1}
                min={1}
                max={levels.length}
                onChange={handleSliderChange}
                size={matches_sm_up ? "medium" : "small"}
                sx={{
                    minWidth: "100px",
                    maxWidth: "500px",
                    ml: "8px",
                    color: getElementColor({ element }),
                }}
            />
        </FlexBox>
    );
}

export default MemospriteSkillScaling;
