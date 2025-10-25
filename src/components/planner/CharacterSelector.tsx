import { BaseSyntheticEvent, useMemo, useState } from "react";

// Component imports
import Image from "custom/Image";
import RarityStars from "custom/RarityStars";
import SearchBar from "custom/SearchBar";
import Dropdown from "custom/Dropdown";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, StackProps } from "@mui/material";

// Helper imports
import { range, sortBy } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import {
    addItem,
    getSelectedCharacters,
    setPlannerCharacters,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { elements, rarities, paths } from "data/common";
import { characterTraceIDs } from "data/characterTraceIds";
import { getBossMaterial } from "data/materials/bossMaterials";
import { getWeeklyBossMaterial } from "data/materials/weeklyBossMaterials";
import { getCalyxMaterial } from "data/materials/calyxMaterials";
import { getCommonMaterial } from "data/materials/commonMaterials";

// Type imports
import { Element, Path, Rarity } from "types/_common";
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";
import { CharacterFilterState } from "reducers/characterFilters";

const initialFilters: CharacterFilterState = {
    element: [],
    path: [],
    rarity: [],
    calyxMat: [],
    commonMat: [],
    bossMat: [],
    weeklyBossMat: [],
    world: [],
};

function CharacterSelector({ handleClose }: { handleClose: () => void }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );

    const options = createOptions(characters);
    const selected = useAppSelector(getSelectedCharacters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const [filters, setFilters] = useState(initialFilters);
    const filterGroups = [
        {
            name: "Element",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                setFilters({ ...filters, element: newValues }),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Path",
            value: filters.path,
            onChange: (_: BaseSyntheticEvent, newValues: Path[]) =>
                setFilters({ ...filters, path: newValues }),
            buttons: createButtons(paths, "paths"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
            width: "auto",
        },
    ];

    const currentOptions = useMemo(
        () => filterOptions(options, selected, filters, searchValue),
        [options, selected, filters, searchValue]
    );

    const handleClick = (option: CharacterCostObject) => {
        const newValues = [...selected];
        newValues.push(option);
        dispatch(setPlannerCharacters(newValues));
        dispatch(addItem(option.id));
        handleClose();
    };

    const smallIconStyle = { width: "16px", height: "16px" };

    const stackParams: StackProps = {
        spacing: 2,
        direction: "row",
        alignItems: "center",
        sx: {
            p: 1,
            borderRadius: "4px",
            backgroundColor: theme.background(0, "dark"),
            "&:hover": {
                backgroundColor: theme.background(0, "light"),
                cursor: "pointer",
            },
        },
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    size={{ height: "36px" }}
                />
                <Dropdown title="Filters">
                    {filterGroups.map((filter, index) => (
                        <Stack key={index} spacing={1}>
                            <ToggleButtons
                                color="secondary"
                                buttons={filter.buttons}
                                value={filter.value}
                                onChange={filter.onChange}
                                width={filter.width || undefined}
                                spacing={4}
                                padding={
                                    "label" in filter.buttons[0] ? "0 8px" : 0
                                }
                            />
                        </Stack>
                    ))}
                </Dropdown>
            </Stack>
            <Stack
                spacing={1}
                sx={{
                    height: "50vh",
                    maxHeight: "600px",
                    overflowY: "auto",
                }}
            >
                {currentOptions.length > 0 ? (
                    currentOptions.map((option) => (
                        <Stack
                            key={option.id}
                            {...stackParams}
                            onClick={() => handleClick(option)}
                        >
                            <Stack
                                spacing={1}
                                sx={{
                                    p: "4px",
                                    borderRadius: "16px",
                                    backgroundColor:
                                        theme.appbar.backgroundColor,
                                }}
                            >
                                <Image
                                    src={`elements/${option.element}`}
                                    alt={option.element}
                                    style={smallIconStyle}
                                    tooltip={option.element}
                                />
                                <Image
                                    src={`paths/${option.path}`}
                                    alt={option.path}
                                    style={smallIconStyle}
                                    tooltip={option.path}
                                />
                            </Stack>
                            <Image
                                src={`characters/icons/${option.name}`}
                                alt={option.name}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    border: `2px solid ${getRarityColor(
                                        option.rarity
                                    )}`,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                    backgroundColor: theme.background(2),
                                    boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                        option.rarity
                                    )}`,
                                }}
                            />
                            <TextStyled
                                variant={
                                    matches_md_up
                                        ? "body1-styled"
                                        : "body2-styled"
                                }
                                noWrap
                            >
                                {option.fullName}
                            </TextStyled>
                        </Stack>
                    ))
                ) : (
                    <TextStyled sx={{ textAlign: "center" }}>
                        No characters
                    </TextStyled>
                )}
            </Stack>
        </Stack>
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    const costArray = range(0, 19, 0);
    return characters.map(
        (char) =>
            ({
                id: `character_${char.id}`,
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                path: char.path,
                release: char.release,
                traceIDs: characterTraceIDs[char.path],
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Basic ATK, Skill, Ultimate, Talent, Trace Nodes (5 - 17), Memosprite Skill, Memosprite Talent]
                    credits: {
                        Credit: costArray,
                    },
                    characterXP: {
                        CharacterXP1: costArray,
                        CharacterXP2: costArray,
                        CharacterXP3: costArray,
                    },
                    bossMat: {
                        [getBossMaterial({ tag: char.materials.bossMat })?.id!]:
                            costArray,
                    },
                    weeklyBossMat: {
                        [getWeeklyBossMaterial({
                            tag: char.materials.weeklyBossMat,
                        })?.id!]: costArray,
                    },
                    tracksOfDestiny: {
                        "Tracks of Destiny": costArray,
                    },
                    calyxMat: {
                        [getCalyxMaterial({
                            tag: `${char.materials.calyxMat}1`,
                        })?.id!]: costArray,
                        [getCalyxMaterial({
                            tag: `${char.materials.calyxMat}2`,
                        })?.id!]: costArray,
                        [getCalyxMaterial({
                            tag: `${char.materials.calyxMat}3`,
                        })?.id!]: costArray,
                    },
                    commonMat: {
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}1`,
                        })?.id!]: costArray,
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}2`,
                        })?.id!]: costArray,
                        [getCommonMaterial({
                            tag: `${char.materials.commonMat}3`,
                        })?.id!]: costArray,
                    },
                },
                values: {
                    level: {},
                    attack: {},
                    skill: {},
                    ultimate: {},
                    talent: {},
                    trace: {},
                    memospriteSkill: {},
                    memospriteTalent: {},
                },
                dataFormat: "v2",
            } as CharacterCostObject)
    );
}

function filterOptions(
    characters: CharacterCostObject[],
    selected: CharacterCostObject[],
    filters: CharacterFilterState,
    searchValue: string
) {
    let chars: CharacterCostObject[];
    chars = characters.filter(
        (char) => !selected.map((char) => char.id).includes(char.id)
    );
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.path.length > 0) {
        chars = chars.filter((char) => filters.path.includes(char.path));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    chars = chars.sort(
        (a, b) =>
            sortBy(a.release.version, b.release.version) ||
            sortBy(a.rarity, b.rarity) ||
            sortBy(b.fullName, a.fullName)
    );

    return chars;
}

function createButtons<T extends string>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={item}
            />
        ),
    }));
}
