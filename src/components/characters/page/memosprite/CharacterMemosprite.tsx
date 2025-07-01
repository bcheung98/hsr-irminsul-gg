import { BaseSyntheticEvent, CSSProperties, useState } from "react";

// Component imports
import MemospriteSkillTab from "./MemospriteSkillTab";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";
import { NovaflareButtons } from "../CharacterNovaflare";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { getElementColor } from "helpers/elementColors";

// Type imports
import { CharacterMemospriteSkillKey, CharacterProps } from "types/character";

function CharacterMemosprite({ character, novaflare }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, rarity, element, path, memosprite, materials, keywords } =
        character;

    const elementColor = getElementColor({ element });

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const skillIcon = (index: number): CSSProperties => {
        const selected = index === tabValue;
        return {
            width: matches_sm_up ? "48px" : "40px",
            height: matches_sm_up ? "48px" : "40px",
            margin: "4px 0",
            padding: "4px",
            backgroundColor: theme.appbar.backgroundColor,
            borderWidth: selected ? "thick" : "3px",
            borderStyle: selected ? "double" : "solid",
            borderColor: elementColor,
            borderRadius: "64px",
            boxShadow: selected ? `0 0 12px 4px ${elementColor}` : "none",
            transition: "box-shadow 250ms",
        };
    };

    if (memosprite) {
        const skills = objectKeys(memosprite).slice(
            1
        ) as CharacterMemospriteSkillKey[];
        return (
            <MainContentBox
                title={`Memosprite "${memosprite.name}"`}
                contentProps={{ padding: 0 }}
                actions={
                    <NovaflareButtons
                        hasNovaflare={novaflare?.hasNovaflare!}
                        value={novaflare?.value!}
                        onChange={novaflare?.onChange!}
                    />
                }
            >
                <StyledTabs
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleTabChange}
                    scrollButtons="auto"
                    allowScrollButtonsMobile={!matches_sm_up}
                    sx={{
                        height: "100%",
                        "& .MuiTabScrollButton-root": {
                            color: theme.text.primary,
                            backgroundColor: theme.background(2),
                        },
                        ".MuiTabs-scrollButtons.Mui-disabled": {
                            opacity: 0.3,
                        },
                        "& .MuiTabs-indicatorSpan": {
                            width: "100%",
                            backgroundColor: elementColor,
                        },
                    }}
                >
                    {skills.map((key, index) => (
                        <StyledTab
                            key={key}
                            icon={
                                <Image
                                    src={`characters/skills/${name.toLowerCase()}_ms_${key}`}
                                    alt={key}
                                    style={skillIcon(index)}
                                />
                            }
                            sx={{ px: 0 }}
                        />
                    ))}
                </StyledTabs>
                {skills.map((key, index) => (
                    <TabPanel key={key} index={index} value={tabValue}>
                        <MemospriteSkillTab
                            name={name}
                            skillKey={key}
                            skillData={memosprite[key]}
                            rarity={rarity}
                            element={element}
                            path={path}
                            materials={materials}
                            keywords={keywords}
                        />
                    </TabPanel>
                ))}
            </MainContentBox>
        );
    } else {
        return null;
    }
}

export default CharacterMemosprite;
