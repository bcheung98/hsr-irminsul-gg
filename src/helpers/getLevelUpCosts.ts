import { PayloadCostObject } from "types/costs";
import { objectKeys, range } from "./utils";
import {
    characterLevel,
    characterMemosprite,
    characterSkill,
    characterTraceMainCosts,
    characterTraceMainCostsRemembrance,
    characterTraceSmallCosts,
    characterTraceSmallCostsRemembrance,
    weaponLevel,
} from "data/levelUpCosts";
import { Path, Rarity } from "types/_common";
import { CharacterUnlockKeys } from "types/character";
import { LevelUpCostSkillKeys } from "custom/LevelUpCosts";

export interface GetLevelUpCostsProps {
    start?: number;
    stop?: number;
    selected?: boolean;
    withXP?: boolean;
    name?: string;
    path?: Path;
    rarity?: Rarity;
    skillKey?: LevelUpCostSkillKeys;
    node?: CharacterUnlockKeys;
}

export function getCharacterLevelCost({
    start,
    stop,
    selected,
    name,
    rarity,
    withXP,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "name" | "rarity" | "withXP"
    >
>) {
    const costs = { ...characterLevel(rarity, name) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        characterXP1,
        characterXP2,
        characterXP3,
        bossMat,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            bossMat,
            commonMat1,
            commonMat2,
            commonMat3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        characterXP: {
            characterXP1: characterXP1,
            characterXP2: characterXP2,
            characterXP3: characterXP3,
        },
        bossMat: {
            bossMat: bossMat,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
        },
    } as PayloadCostObject;
}
export function getCharacterSkillCost({
    start,
    stop,
    selected,
    path,
    rarity,
    skillKey,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "path" | "rarity" | "skillKey"
    >
>) {
    const costs = { ...characterSkill(rarity, skillKey, path) };
    let [
        credits,
        weeklyBossMat,
        tracksOfDestiny,
        calyxMat1,
        calyxMat2,
        calyxMat3,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weeklyBossMat,
            tracksOfDestiny,
            calyxMat1,
            calyxMat2,
            calyxMat3,
            commonMat1,
            commonMat2,
            commonMat3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        weeklyBossMat: {
            weeklyBossMat: weeklyBossMat,
        },
        tracksOfDestiny: {
            tracksOfDestiny: tracksOfDestiny,
        },
        calyxMat: {
            calyxMat1: calyxMat1,
            calyxMat2: calyxMat2,
            calyxMat3: calyxMat3,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
        },
    } as PayloadCostObject;
}

export function getCharacterMemosprite({
    start,
    stop,
    selected,
    rarity,
}: Required<
    Pick<GetLevelUpCostsProps, "start" | "stop" | "selected" | "rarity">
>) {
    const costs = { ...characterMemosprite(rarity) };
    let [
        credits,
        calyxMat1,
        calyxMat2,
        calyxMat3,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            calyxMat1,
            calyxMat2,
            calyxMat3,
            commonMat1,
            commonMat2,
            commonMat3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        calyxMat: {
            calyxMat1: calyxMat1,
            calyxMat2: calyxMat2,
            calyxMat3: calyxMat3,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
        },
    } as PayloadCostObject;
}

export function getCharacterTraceMain({
    node,
    rarity,
    selected,
    path,
}: {
    node: Extract<CharacterUnlockKeys, "A2" | "A4" | "A6">;
    rarity: Rarity;
    selected: boolean;
    path: Path;
}) {
    const costs =
        path === "Remembrance"
            ? { ...characterTraceMainCostsRemembrance[node] }
            : { ...characterTraceMainCosts[node] };
    const index = rarity - 4;
    let {
        credits,
        calyxMat1,
        calyxMat2,
        calyxMat3,
        weeklyBossMat,
        tracksOfDestiny,
    } = costs;
    return {
        credits: {
            Credit: selected && credits ? credits[index] : 0,
        },
        weeklyBossMat: {
            weeklyBossMat: selected && weeklyBossMat ? weeklyBossMat[index] : 0,
        },
        tracksOfDestiny: {
            tracksOfDestiny:
                selected && tracksOfDestiny ? tracksOfDestiny[index] : 0,
        },
        calyxMat: {
            calyxMat1: selected && calyxMat1 ? calyxMat1[index] : 0,
            calyxMat2: selected && calyxMat2 ? calyxMat2[index] : 0,
            calyxMat3: selected && calyxMat3 ? calyxMat3[index] : 0,
        },
    } as PayloadCostObject;
}

export function getCharacterTraceSmall({
    node,
    rarity,
    selected,
    path,
}: {
    node: CharacterUnlockKeys;
    rarity: Rarity;
    selected: boolean;
    path: Path;
}) {
    const costs =
        path === "Remembrance"
            ? { ...characterTraceSmallCostsRemembrance[node] }
            : { ...characterTraceSmallCosts[node] };
    const index = rarity - 4;
    let {
        credits,
        calyxMat1,
        calyxMat2,
        calyxMat3,
        commonMat1,
        commonMat2,
        commonMat3,
    } = costs;
    return {
        credits: {
            Credit: selected && credits ? credits[index] : 0,
        },
        calyxMat: {
            calyxMat1: selected && calyxMat1 ? calyxMat1[index] : 0,
            calyxMat2: selected && calyxMat2 ? calyxMat2[index] : 0,
            calyxMat3: selected && calyxMat3 ? calyxMat3[index] : 0,
        },
        commonMat: {
            commonMat1: selected && commonMat1 ? commonMat1[index] : 0,
            commonMat2: selected && commonMat2 ? commonMat2[index] : 0,
            commonMat3: selected && commonMat3 ? commonMat3[index] : 0,
        },
    } as PayloadCostObject;
}

export function getWeaponLevelCost({
    start,
    stop,
    selected,
    rarity,
    withXP,
}: Required<
    Pick<
        GetLevelUpCostsProps,
        "start" | "stop" | "selected" | "rarity" | "withXP"
    >
>) {
    const costs = { ...weaponLevel(rarity) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        weaponXP1,
        weaponXP2,
        weaponXP3,
        calyxMat1,
        calyxMat2,
        calyxMat3,
        commonMat1,
        commonMat2,
        commonMat3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            calyxMat1,
            calyxMat2,
            calyxMat3,
            commonMat1,
            commonMat2,
            commonMat3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        weaponXP: {
            weaponXP1: weaponXP1,
            weaponXP2: weaponXP2,
            weaponXP3: weaponXP3,
        },
        calyxMat: {
            calyxMat1: calyxMat1,
            calyxMat2: calyxMat2,
            calyxMat3: calyxMat3,
        },
        commonMat: {
            commonMat1: commonMat1,
            commonMat2: commonMat2,
            commonMat3: commonMat3,
        },
    } as PayloadCostObject;
}

function calculateCosts<T extends { [key: string]: number[] }>(
    costs: T,
    start: number,
    stop: number
) {
    return Object.values(costs).map((arr) =>
        arr.slice(start, stop).reduce((a, c) => a + c)
    );
}
