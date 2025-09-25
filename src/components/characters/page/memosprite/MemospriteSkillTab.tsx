import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterSkillAdvancedStats from "../skills/CharacterSkillAdvancedStats";
import CharacterSkillLevelUpCost from "../skills/CharacterSkillLevelUpCost";
import CharacterSkillKeywordPopup from "../skills/CharacterSkillKeywordPopup";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, Dialog } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element, Path, Rarity } from "types/_common";
import { CharacterMemospriteSkillKey, MemospriteSkill } from "types/character";
import { CharacterMaterials } from "types/materials";
import { SkillKeywords } from "types/skill";
import MemospriteSkillScaling from "./MemospriteSkillScaling";

interface MemospriteSkillTabProps {
    name: string;
    skillKey: CharacterMemospriteSkillKey;
    skillData: MemospriteSkill[];
    rarity: Rarity;
    element: Element;
    path: Path;
    materials: CharacterMaterials;
    keywords?: SkillKeywords;
}

export interface MemospriteSkillScalingProps {
    skillKey: CharacterMemospriteSkillKey;
    skillData: MemospriteSkill[];
    element: Element;
}

function MemospriteSkillTab({
    name,
    skillData,
    skillKey,
    rarity,
    element,
    path,
    materials,
    keywords,
}: MemospriteSkillTabProps) {
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
                                <Image
                                    src={
                                        skill.icon
                                            ? `characters/skills/${name.toLowerCase()}_${
                                                  skill.icon
                                              }`
                                            : `characters/skills/${name.toLowerCase()}_ms_${skillKey}${
                                                  index > 0 ? index : ""
                                              }`
                                    }
                                    alt={skill.name}
                                    style={theme.styles.skillIcon(element)}
                                />
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
                                    description: skill.description || "",
                                    newClassName: "memosprite-skill-value",
                                    onClick: handleClickOpen,
                                })}
                            </Text>
                        </Box>
                    ))}
                </Stack>
                <Box sx={{ mt: "16px" }}>
                    <MemospriteSkillScaling
                        skillKey={skillKey}
                        skillData={skillData}
                        element={element}
                    />
                </Box>
                <CharacterSkillLevelUpCost
                    skillKey={convertSkillKey(skillKey)}
                    name={name}
                    element={element}
                    rarity={rarity}
                    path={path}
                    materials={materials}
                />
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

export default MemospriteSkillTab;

function formatSkillKey(skill: CharacterMemospriteSkillKey) {
    switch (skill) {
        case "skill":
            return "Memosprite Skill";
        case "talent":
            return "Memosprite Talent";
    }
}

function convertSkillKey(skill: CharacterMemospriteSkillKey) {
    switch (skill) {
        case "skill":
            return "memospriteSkill";
        case "talent":
            return "memospriteTalent";
    }
}
