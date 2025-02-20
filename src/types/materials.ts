import { Rarity } from "./_common";
import {
    characterXPMatNames,
    weaponXPMatNames,
} from "data/materials/xpMaterials";
import { calyxMatNames } from "data/materials/calyxMaterials";
import { commonMatNames } from "data/materials/commonMaterials";
import { bossMatNames } from "data/materials/bossMaterials";
import { weeklyBossMatNames } from "data/materials/weeklyBossMaterials";
import { Version } from "./version";

export type MaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "bossMat"
    | "weeklyBossMat"
    | "tracksOfDestiny"
    | "calyxMat"
    | "commonMat";

export interface Material {
    id: string;
    category: MaterialCategory;
    tag: string;
    name: string;
    displayName: string;
    source?: string;
    rarity?: Rarity;
    release: Version;
}

export type CharacterXPMaterial = (typeof characterXPMatNames)[number];
export type WeaponXPMaterial = (typeof weaponXPMatNames)[number];

export type CalyxMaterial = (typeof calyxMatNames)[number];
export type CommonMaterial = (typeof commonMatNames)[number];
export type BossMaterial = (typeof bossMatNames)[number];
export type WeeklyBossMaterial = (typeof weeklyBossMatNames)[number];

export interface Materials {
    calyxMat?: CalyxMaterial;
    commonMat?: CommonMaterial;
    bossMat?: BossMaterial;
    weeklyBossMat?: WeeklyBossMaterial;
}

export type CharacterMaterials = Required<Materials>;
export type WeaponMaterials = Required<
    Pick<Materials, "calyxMat" | "commonMat">
>;
