import { useState } from "react";

// Component imports
import MaterialImage from "custom/MaterialImage";
import LevelUpSliderContainer from "custom/LevelUpSliderContainer";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { getElementColor } from "helpers/elementColors";
import {
    getCharacterLevelCost,
    getCharacterMemosprite,
    getCharacterSkillCost,
    getCharacterTraceMain,
    getCharacterTraceSmall,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { Element, Path, Rarity } from "types/_common";
import { TotalCostObject } from "types/costs";
import { CostObjectSourceIndex } from "types/costs";
import {
    BossMaterial,
    CalyxMaterial,
    CommonMaterial,
    Materials,
    WeeklyBossMaterial,
} from "types/materials";
import { CharacterUnlockKeys } from "types/character";

export type LevelUpCostSkillKeys = keyof typeof CostObjectSourceIndex;

interface LevelUpCostsProps {
    type: "character" | "weapon";
    name?: string;
    skillKey: LevelUpCostSkillKeys;
    rarity?: Rarity;
    path?: Path;
    element?: Element;
    mats: Materials;
    unlock?: CharacterUnlockKeys;
    threshold?: string;
}

function LevelUpCosts({
    type,
    name = "",
    skillKey,
    rarity = 3,
    path = "Destruction",
    element,
    mats,
    unlock,
    threshold = "@100",
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    if (name.startsWith("Trailblazer")) {
        rarity = 4;
    }

    const levels = getLevels(skillKey);
    const minDistance = 1;
    const maxValue = levels.length;
    const [values, setValues] = useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValues([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setValues([clamped - minDistance, clamped]);
            }
        } else {
            setValues(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    values.includes(index + 1) ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: values.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    const costs = getCosts({
        type,
        skillKey,
        name,
        rarity,
        path,
        values,
        mats,
        unlock,
    });

    return (
        <Box sx={{ containerType: "inline-size" }}>
            <Grid
                container
                spacing={2}
                sx={{ mb: levels.length > 0 ? "16px" : "0px" }}
            >
                {createMaterialCostData(costs).map((material, index) => (
                    <MaterialImage
                        key={index}
                        name={material.name}
                        rarity={material.rarity}
                        cost={material.cost}
                        imgSrc={material.img}
                    />
                ))}
            </Grid>
            {levels.length > 0 && (
                <LevelUpSliderContainer
                    values={[levels[values[0] - 1], levels[values[1] - 1]]}
                    threshold={threshold}
                >
                    <StyledSlider
                        value={values}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches_sm_dn ? "small" : "medium"}
                        sx={{
                            color: getElementColor({ element }),
                        }}
                    />
                </LevelUpSliderContainer>
            )}
        </Box>
    );
}

export default LevelUpCosts;

function getLevels(skillKey: LevelUpCostsProps["skillKey"]) {
    switch (skillKey) {
        case "level":
            return ["20", "30", "40", "50", "60", "70", "80"];
        case "attack":
        case "memospriteSkill":
        case "memospriteTalent":
            return range(1, 6);
        case "skill":
        case "ultimate":
        case "talent":
            return range(1, 10);
        case "traceMain":
        case "traceSmall":
        default:
            return [];
    }
}

function getCosts({
    type,
    skillKey,
    name,
    rarity,
    path,
    values,
    mats,
    unlock = "A2",
}: {
    type: "character" | "weapon";
    skillKey: LevelUpCostSkillKeys;
    name: string;
    rarity: Rarity;
    path: Path;
    values: number[];
    mats: Materials;
    unlock?: CharacterUnlockKeys;
}) {
    let costs, levelUpCost;
    switch (skillKey) {
        case "level":
            if (type === "character") {
                levelUpCost = getCharacterLevelCost({
                    start: values[0],
                    stop: values[1],
                    selected: true,
                    withXP: false,
                    name: name,
                    rarity: rarity,
                });
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    bossMat: {
                        [`${mats.bossMat}` as BossMaterial]:
                            levelUpCost.bossMat.bossMat,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                    },
                } as TotalCostObject;
            } else {
                levelUpCost = getWeaponLevelCost({
                    start: values[0],
                    stop: values[1],
                    selected: true,
                    withXP: false,
                    rarity: rarity,
                });
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    calyxMat: {
                        [`${mats.calyxMat}1` as CalyxMaterial]:
                            levelUpCost.calyxMat.calyxMat1,
                        [`${mats.calyxMat}2` as CalyxMaterial]:
                            levelUpCost.calyxMat.calyxMat2,
                        [`${mats.calyxMat}3` as CalyxMaterial]:
                            levelUpCost.calyxMat.calyxMat3,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                    },
                } as TotalCostObject;
            }
            break;
        case "attack":
        case "skill":
        case "ultimate":
        case "talent":
            levelUpCost = getCharacterSkillCost({
                start: values[0],
                stop: values[1],
                selected: true,
                path: path,
                skillKey: skillKey,
                rarity: rarity,
            });
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                calyxMat: {
                    [`${mats.calyxMat}1` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat1,
                    [`${mats.calyxMat}2` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat2,
                    [`${mats.calyxMat}3` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat3,
                },
                commonMat: {
                    [`${mats.commonMat}1` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat1,
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                tracksOfDestiny: {
                    "Tracks of Destiny":
                        levelUpCost.tracksOfDestiny.tracksOfDestiny,
                },
            } as TotalCostObject;
            break;
        case "memospriteSkill":
        case "memospriteTalent":
            levelUpCost = getCharacterMemosprite({
                start: values[0],
                stop: values[1],
                selected: true,
                rarity: rarity,
            });
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                calyxMat: {
                    [`${mats.calyxMat}1` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat1,
                    [`${mats.calyxMat}2` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat2,
                    [`${mats.calyxMat}3` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat3,
                },
                commonMat: {
                    [`${mats.commonMat}1` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat1,
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                },
            } as TotalCostObject;
            break;
        case "traceMain":
            levelUpCost = getCharacterTraceMain({
                node: unlock as "A2" | "A4" | "A6",
                rarity,
                selected: true,
                path,
            });
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                calyxMat: {
                    [`${mats.calyxMat}1` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat1,
                    [`${mats.calyxMat}2` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat2,
                    [`${mats.calyxMat}3` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat3,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                tracksOfDestiny: {
                    "Tracks of Destiny":
                        levelUpCost.tracksOfDestiny.tracksOfDestiny,
                },
            } as TotalCostObject;
            break;
        case "traceSmall":
            levelUpCost = getCharacterTraceSmall({
                node: unlock,
                rarity,
                selected: true,
                path,
            });
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                calyxMat: {
                    [`${mats.calyxMat}1` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat1,
                    [`${mats.calyxMat}2` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat2,
                    [`${mats.calyxMat}3` as CalyxMaterial]:
                        levelUpCost.calyxMat.calyxMat3,
                },
                commonMat: {
                    [`${mats.commonMat}1` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat1,
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                },
            } as TotalCostObject;
            break;
    }
    return costs;
}
