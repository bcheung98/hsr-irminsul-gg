// Component imports
import LevelSlider from "./LevelSlider";
import StatNode from "./StatNode";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { getElementColor } from "helpers/elementColors";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

// Type imports
import {
    CharacterCostObject,
    CostSliderData,
    UpdateCostsPayload,
} from "types/costs";
import { CardMode } from "./PlannerCard";
import { Character } from "types/character";

function CharacterSliders({
    character,
    mode,
}: {
    character: CharacterCostObject;
    mode: CardMode;
}) {
    const name = character.name.toLowerCase();
    const char = useAppSelector(selectCharacters).find(
        (c) => c.name === character.name
    ) as Character;
    const values = character.values;

    const rarity = character.name.startsWith("Trailblazer") ? 4 : char.rarity;

    const sliders: {
        title: string;
        icon?: string;
        levels: (string | number)[];
        type: UpdateCostsPayload["type"];
        values: CostSliderData;
    }[] = [
        {
            title: "Level",
            levels: charLevel,
            type: "level",
            values: values.level,
        },
        {
            title: "Basic ATK",
            icon: `characters/skills/${name}_attack`,
            levels: skillLevel.slice(0, 6),
            type: "attack",
            values: values.attack,
        },
        {
            title: "Skill",
            icon: `characters/skills/${name}_skill`,
            levels: skillLevel,
            type: "skill",
            values: values.skill,
        },
        {
            title: "Ultimate",
            icon: `characters/skills/${name}_ultimate`,
            levels: skillLevel,
            type: "ultimate",
            values: values.ultimate,
        },
        {
            title: "Talent",
            icon: `characters/skills/${name}_talent`,
            levels: skillLevel,
            type: "talent",
            values: values.talent,
        },
        {
            title: "Memosprite Skill",
            icon: `characters/skills/${name}_ms_skill`,
            levels: skillLevel.slice(0, 6),
            type: "memospriteSkill",
            values: values.memospriteSkill,
        },
        {
            title: "Memosprite Talent",
            icon: `characters/skills/${name}_ms_talent`,
            levels: skillLevel.slice(0, 6),
            type: "memospriteTalent",
            values: values.memospriteTalent,
        },
    ];

    const [
        Level,
        Attack,
        Skill,
        Ultimate,
        Talent,
        MemospriteSkill,
        MemospriteTalent,
    ] = sliders.map((slider) => (
        <LevelSlider
            key={slider.type}
            mode={mode}
            name={character.name}
            variant="character"
            title={slider.title}
            icon={slider.icon}
            rarity={rarity}
            path={character.path}
            levels={slider.levels}
            values={slider.values}
            color={getElementColor({ element: character.element })}
            type={slider.type}
        />
    ));

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Grid container rowSpacing={1} columnSpacing={4}>
                <Grid size={12}>{Level}</Grid>
                {[Attack, Skill, Ultimate, Talent].map((slider, index) => (
                    <Grid
                        key={index}
                        size={
                            mode === "view"
                                ? { xs: 6, sm: 3 }
                                : { xs: 12, sm: 6 }
                        }
                    >
                        {slider}
                    </Grid>
                ))}
                {character.path === "Remembrance" &&
                    [MemospriteSkill, MemospriteTalent].map((slider, index) => (
                        <Grid
                            key={index}
                            size={
                                mode === "view"
                                    ? { xs: 6, sm: 3 }
                                    : { xs: 12, sm: 6 }
                            }
                        >
                            {slider}
                        </Grid>
                    ))}
            </Grid>
            <FlexBox
                sx={{
                    flexWrap: "wrap",
                    rowGap: "16px",
                    columnGap: "32px",
                    px: "8px",
                }}
            >
                {char.traces.map((trace, index) => (
                    <StatNode
                        key={index}
                        mode={mode}
                        id={`${String.fromCharCode(index + 65)}-1`}
                        name={character.name}
                        rarity={rarity}
                        path={character.path}
                        trace={trace}
                        values={values.trace}
                    />
                ))}
            </FlexBox>
        </Stack>
    );
}

export default CharacterSliders;

const charLevel = [
    "1",
    "20",
    "20+",
    "30",
    "30+",
    "40",
    "40+",
    "50",
    "50+",
    "60",
    "60+",
    "70",
    "70+",
    "80",
];

const skillLevel = range(1, 10);
