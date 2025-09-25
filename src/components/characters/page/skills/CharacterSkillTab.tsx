import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterSkillAdvancedStats from "./CharacterSkillAdvancedStats";
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillKeywordPopup from "./CharacterSkillKeywordPopup";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, Dialog } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element, Path, Rarity } from "types/_common";
import {
    CharacterSkill,
    CharacterSkillKey,
    CharacterTalent,
    CharacterTechnique,
} from "types/character";
import { CharacterMaterials } from "types/materials";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";
import { SkillKeywords } from "types/skill";

interface CharacterSkillTabProps {
    name: string;
    skillKey: CharacterSkillKey;
    skillData: CharacterSkill[] | CharacterTalent[] | CharacterTechnique[];
    rarity: Rarity;
    element: Element;
    path: Path;
    materials: CharacterMaterials;
    keywords?: SkillKeywords;
}

export interface CharacterSkillScalingProps {
    skillKey: CharacterSkillKey;
    skillData: CharacterSkill[] | CharacterTalent[] | CharacterTechnique[];
    element: Element;
}

export interface CharacterSkillLevelUpProps {
    skillKey: LevelUpCostSkillKeys;
    name: string;
    rarity: Rarity;
    element: Element;
    path: Path;
    materials: CharacterMaterials;
}

function CharacterSkillTab({
    skillData,
    skillKey,
    name,
    rarity,
    element,
    path,
    materials,
    keywords,
}: CharacterSkillTabProps) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState("");
    const handleClickOpen = (event: BaseSyntheticEvent) => {
        setTag(event.target.className.split("-")[1]);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box>
                <TextStyled sx={{ mb: "8px", fontStyle: "italic" }}>
                    {formatSkillKey(skillKey)}
                </TextStyled>
                <Stack spacing={2}>
                    {skillData.map((skill, index) => (
                        <Box key={`${skillKey}-${index}`}>
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                sx={{ height: "64px", mb: "8px" }}
                            >
                                {skill.showIcon !== false && (
                                    <Image
                                        src={
                                            skill.icon ||
                                            `characters/skills/${name.toLowerCase()}_${skillKey}${
                                                index > 0 ? index : ""
                                            }`
                                        }
                                        alt={skill.name}
                                        style={theme.styles.skillIcon(element)}
                                    />
                                )}
                                <Box>
                                    <TextStyled variant="h6-styled">
                                        {skill.name}
                                    </TextStyled>
                                    {skill.tag && (
                                        <TextStyled
                                            sx={{ color: theme.text.header }}
                                        >
                                            [{skill.tag}]
                                        </TextStyled>
                                    )}
                                </Box>
                            </Stack>
                            <CharacterSkillAdvancedStats skill={skill} />
                            <Text sx={{ color: theme.text.description }}>
                                {parseSkillDescription({
                                    description: skill.description,
                                    newClassName: "character-skill-value",
                                    onClick: handleClickOpen,
                                })}
                            </Text>
                        </Box>
                    ))}
                </Stack>
                <Box sx={{ mt: "16px" }}>
                    {skillKey !== "technique" && (
                        <CharacterSkillScaling
                            skillKey={skillKey}
                            skillData={skillData}
                            element={element}
                        />
                    )}
                </Box>
                {skillKey !== "technique" && (
                    <CharacterSkillLevelUpCost
                        skillKey={skillKey}
                        name={name}
                        element={element}
                        rarity={rarity}
                        path={path}
                        materials={materials}
                    />
                )}
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                disableScrollLock
            >
                <CharacterSkillKeywordPopup
                    onClose={handleClose}
                    tag={tag}
                    keywords={keywords}
                />
            </Dialog>
        </>
    );
}

export default CharacterSkillTab;

function formatSkillKey(skill: CharacterSkillKey) {
    switch (skill) {
        case "attack":
            return "Basic ATK";
        case "skill":
            return "Skill";
        case "ultimate":
            return "Ultimate";
        case "talent":
            return "Talent";
        case "technique":
            return "Technique";
    }
}
