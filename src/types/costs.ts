import { characterLevel, characterSkill, weaponLevel } from "data/levelUpCosts";
import { NestedKeyOf, Path, Rarity } from "./_common";
import { Character, CharacterUnlockKeys } from "./character";
import { Weapon } from "./weapon";
import {
    CharacterXPMaterial,
    WeaponXPMaterial,
    BossMaterial,
    WeeklyBossMaterial,
    CalyxMaterial,
    CommonMaterial,
} from "./materials";

export type CostObjectKeys =
    | NestedKeyOf<TotalCostObject>
    | keyof ReturnType<typeof characterLevel>
    | keyof ReturnType<typeof characterSkill>
    | keyof ReturnType<typeof weaponLevel>
    | "Credit"
    | "Tracks of Destiny";

export type TotalCostObjectKeys = keyof TotalCostObject;

export interface TotalCostObject {
    credits: Record<"Credit", number>;
    characterXP: Record<CharacterXPMaterial, number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    bossMat: Record<BossMaterial, number>;
    weeklyBossMat: Record<WeeklyBossMaterial, number>;
    tracksOfDestiny: Record<"Tracks of Destiny", number>;
    calyxMat: Record<CalyxMaterial, number>;
    commonMat: Record<CommonMaterial, number>;
}

export type PayloadCostObject = Record<
    TotalCostObjectKeys,
    Record<CostObjectKeys, number>
>;

export enum CostObjectSourceIndex {
    level,
    attack,
    skill,
    ultimate,
    talent,
    traceMain,
    traceSmall,
    memospriteSkill,
    memospriteTalent,
}

export interface CostSliderData {
    start: number;
    stop: number;
    selected: boolean;
}

export type CostNodeData = Pick<CostSliderData, "selected">;
export type TraceCostNodeValues = Record<string, CostNodeData>;

export type CostSliderValues = Record<
    keyof typeof CostObjectSourceIndex,
    CostSliderData
> & { trace: TraceCostNodeValues };

export type CharacterCostSliderValues = CostSliderValues;
export type WeaponCostSliderValues = Pick<CostSliderValues, "level">;

export interface PayloadData extends Partial<CostSliderData> {
    name?: string;
    rarity?: Rarity;
    path?: Path;
    skillKey?: keyof typeof CostObjectSourceIndex;
    node?: CharacterUnlockKeys;
}

export interface UpdateCostsPayload {
    name: string;
    type: keyof typeof CostObjectSourceIndex;
    data: PayloadData;
    traceID?: string;
}

export interface CharacterCost {
    credits: Record<"Credit", number[]>;
    characterXP: Record<CharacterXPMaterial, number[]>;
    bossMat: Record<BossMaterial, number[]>;
    weeklyBossMat: Record<WeeklyBossMaterial, number[]>;
    tracksOfDestiny: Record<"Tracks of Destiny", number[]>;
    calyxMat: Record<CalyxMaterial, number[]>;
    commonMat: Record<CommonMaterial, number[]>;
}

export interface CharacterCostObject
    extends Pick<
        Character,
        "name" | "fullName" | "rarity" | "element" | "path" | "release"
    > {
    id: string;
    costs: CharacterCost;
    values: CharacterCostSliderValues;
    traceIDs: string[];
}

export interface WeaponCost {
    credits: Record<"Credit", number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    calyxMat: Record<CalyxMaterial, number>;
    commonMat: Record<CommonMaterial, number>;
}

export interface WeaponCostObject
    extends Pick<
        Weapon,
        "name" | "displayName" | "rarity" | "path" | "release"
    > {
    id: string;
    costs: WeaponCost;
    values: WeaponCostSliderValues;
}
