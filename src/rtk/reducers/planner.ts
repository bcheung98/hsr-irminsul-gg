import {
    createSlice,
    isAnyOf,
    PayloadAction,
    UnknownAction,
} from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { reduceMaterialCosts } from "helpers/createMaterialCostData";
import {
    getCharacterLevelCost,
    getCharacterMemosprite,
    getCharacterSkillCost,
    getCharacterTraceMain,
    getCharacterTraceSmall,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";
import { objectKeys } from "helpers/utils";
import {
    CharacterCostObject,
    CostObjectSourceIndex,
    PayloadData,
    TotalCostObject,
    UpdateCostsPayload,
    WeaponCostObject,
} from "types/costs";
import { CharacterUnlockKeys } from "types/character";

interface PlannerState {
    totalCost: TotalCostObject;
    characters: CharacterCostObject[];
    weapons: WeaponCostObject[];
    hidden: string[];
}

const storedCharacters = localStorage.getItem("planner/characters") || "null";
const storedWeapons = localStorage.getItem("planner/weapons") || "null";
const storedHidden = localStorage.getItem("planner/hidden") || "null";

const initialState: PlannerState = {
    totalCost: {
        credits: {
            Credit: 0,
        },
        characterXP: {
            CharacterXP1: 0,
            CharacterXP2: 0,
            CharacterXP3: 0,
        },
        weaponXP: {
            WeaponXP1: 0,
            WeaponXP2: 0,
            WeaponXP3: 0,
        },
        bossMat: {},
        weeklyBossMat: {},
        tracksOfDestiny: {},
        calyxMat: {},
        commonMat: {},
    } as TotalCostObject,
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
    weapons: storedWeapons !== "null" ? JSON.parse(storedWeapons) : [],
    hidden: storedHidden !== "null" ? JSON.parse(storedHidden) : [],
};

export const plannerSlice = createSlice({
    name: "planner",
    initialState,
    reducers: {
        setPlannerCharacters: (
            state,
            action: PayloadAction<CharacterCostObject[]>
        ) => {
            state.characters = action.payload;
        },
        setPlannerWeapons: (
            state,
            action: PayloadAction<WeaponCostObject[]>
        ) => {
            state.weapons = action.payload;
        },
        updateCharacterCosts: (
            state,
            action: PayloadAction<UpdateCostsPayload>
        ) => {
            const charIndex = state.characters.findIndex(
                ({ name }) => name === action.payload.name
            );
            if (charIndex !== -1) {
                const characterCosts = state.characters[charIndex].costs;
                let costs;
                let index = 0;
                const {
                    start,
                    stop,
                    selected,
                    name,
                    rarity,
                    path,
                    skillKey,
                    node,
                } = action.payload.data as Required<PayloadData>;
                switch (action.payload.type) {
                    case "level":
                        costs = getCharacterLevelCost({
                            start,
                            stop,
                            selected,
                            name,
                            rarity,
                            withXP: true,
                        });
                        break;
                    case "attack":
                    case "skill":
                    case "ultimate":
                    case "talent":
                        costs = getCharacterSkillCost({
                            start,
                            stop,
                            selected,
                            path,
                            rarity,
                            skillKey,
                        });
                        break;
                    case "traceMain":
                        costs = getCharacterTraceMain({
                            node: node as Extract<
                                CharacterUnlockKeys,
                                "A2" | "A4" | "A6"
                            >,
                            rarity,
                            selected,
                            path,
                        });
                        break;
                    case "traceSmall":
                        costs = getCharacterTraceSmall({
                            node,
                            rarity,
                            selected,
                            path,
                        });
                        break;
                    case "memospriteSkill":
                    case "memospriteTalent":
                        costs = getCharacterMemosprite({
                            start,
                            stop,
                            selected,
                            rarity,
                        });
                        break;
                }
                if (
                    action.payload.type.startsWith("trace") &&
                    action.payload.traceID
                ) {
                    index =
                        state.characters[charIndex].traceIDs.indexOf(
                            action.payload.traceID
                        ) + 5;

                    if (
                        state.characters[charIndex].values.trace[
                            action.payload.traceID
                        ] === undefined
                    ) {
                        state.characters[charIndex].values.trace[
                            action.payload.traceID
                        ] = { selected: action.payload.data.selected ?? true };
                    }
                    state.characters[charIndex].values.trace[
                        action.payload.traceID
                    ].selected = action.payload.data.selected ?? true;
                } else if (action.payload.type.startsWith("memosprite")) {
                    index = CostObjectSourceIndex[action.payload.type] + 11;
                } else {
                    index = CostObjectSourceIndex[action.payload.type];
                }
                if (!action.payload.type.startsWith("trace")) {
                    state.characters[charIndex].values[action.payload.type] = {
                        start,
                        stop,
                        selected,
                    };
                }
                objectKeys(characterCosts).forEach((material) => {
                    if (costs[material] !== undefined) {
                        const characterSubCosts = characterCosts[material];
                        objectKeys(characterSubCosts).forEach((mat, idx) => {
                            const values = Object.values(costs[material]);
                            (characterCosts[material][mat][index] as number) =
                                values[idx];
                        });
                    }
                });
            }
        },
        updateWeaponCosts: (
            state,
            action: PayloadAction<UpdateCostsPayload>
        ) => {
            const wepIndex = state.weapons.findIndex(
                ({ name }) => name === action.payload.name
            );
            if (wepIndex !== -1) {
                const weaponCosts = state.weapons[wepIndex].costs;
                const { rarity, start, stop, selected } = action.payload
                    .data as Required<PayloadData>;
                let costs = getWeaponLevelCost({
                    start,
                    stop,
                    selected,
                    rarity,
                    withXP: true,
                });
                state.weapons[wepIndex].values.level = {
                    start,
                    stop,
                    selected,
                };
                objectKeys(weaponCosts).forEach((material) => {
                    if (costs[material] !== undefined) {
                        objectKeys(weaponCosts[material]).forEach(
                            (mat, idx) => {
                                const values = Object.values(costs[material]);
                                (weaponCosts[material][mat] as number) =
                                    values[idx];
                            }
                        );
                    }
                });
            }
        },
        toggleHidden: (state, action: PayloadAction<string>) => {
            !state.hidden.includes(action.payload)
                ? state.hidden.push(action.payload)
                : state.hidden.splice(state.hidden.indexOf(action.payload), 1);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher<UnknownAction>(
            (action) => action.type.startsWith("planner/"),
            (state) => {
                const totalCostDraft = {
                    credits: {
                        Credit: 0,
                    },
                    characterXP: {
                        CharacterXP1: 0,
                        CharacterXP2: 0,
                        CharacterXP3: 0,
                    },
                    weaponXP: {
                        WeaponXP1: 0,
                        WeaponXP2: 0,
                        WeaponXP3: 0,
                    },
                    bossMat: {},
                    weeklyBossMat: {},
                    tracksOfDestiny: {},
                    calyxMat: {},
                    commonMat: {},
                } as TotalCostObject;
                state.characters
                    .filter((character) => !state.hidden.includes(character.id))
                    .forEach((character) => {
                        const costs = reduceMaterialCosts({
                            ...character.costs,
                        });
                        objectKeys(costs).forEach((material) => {
                            objectKeys(costs[material]).forEach((mat) => {
                                if (
                                    !objectKeys(
                                        totalCostDraft[material]
                                    ).includes(mat)
                                ) {
                                    (totalCostDraft[material][
                                        mat
                                    ] as number) = 0;
                                }
                                (totalCostDraft[material][mat] as number) +=
                                    costs[material][mat];
                            });
                        });
                    });
                state.weapons
                    .filter((weapon) => !state.hidden.includes(weapon.id))
                    .forEach((weapon) => {
                        const costs = { ...weapon.costs };
                        objectKeys(costs).forEach((material) => {
                            objectKeys(costs[material]).forEach((mat) => {
                                if (
                                    !objectKeys(
                                        totalCostDraft[material]
                                    ).includes(mat)
                                ) {
                                    (totalCostDraft[material][
                                        mat
                                    ] as number) = 0;
                                }
                                (totalCostDraft[material][mat] as number) +=
                                    costs[material][mat];
                            });
                        });
                    });
                state.totalCost = totalCostDraft;
            }
        );
    },
    selectors: {
        getSelectedCharacters: (state): CharacterCostObject[] =>
            state.characters,
        getSelectedWeapons: (state): WeaponCostObject[] => state.weapons,
        getTotalCost: (state): TotalCostObject => state.totalCost,
        getHiddenItems: (state): string[] => state.hidden,
    },
});

export const {
    setPlannerCharacters,
    setPlannerWeapons,
    updateCharacterCosts,
    updateWeaponCosts,
    toggleHidden,
} = plannerSlice.actions;

export const {
    getSelectedCharacters,
    getSelectedWeapons,
    getTotalCost,
    getHiddenItems,
} = plannerSlice.selectors;

export default plannerSlice.reducer;

startAppListening({
    matcher: isAnyOf(setPlannerCharacters, updateCharacterCosts),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.characters);
        localStorage.setItem("planner/characters", data);
    },
});

startAppListening({
    matcher: isAnyOf(setPlannerWeapons, updateWeaponCosts),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.weapons);
        localStorage.setItem("planner/weapons", data);
    },
});

startAppListening({
    actionCreator: toggleHidden,
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.hidden);
        localStorage.setItem("planner/hidden", data);
    },
});
