import { characterBonusStats } from "data/characterBonusStats";
import { Element, Path, Rarity, World } from "./_common";
import { CharacterMaterials } from "./materials";
import { Skill, SkillKeywords, SkillWithScaling } from "./skill";
import { VersionWithDate } from "./version";
import { NovaflareButtonsProps } from "components/characters/page/CharacterNovaflare";

export interface CharacterProps {
    character: Character;
    novaflare?: NovaflareButtonsProps;
}

export interface Character {
    id: number;
    name: string;
    displayName: string;
    fullName: string;
    rarity: Rarity;
    element: Element;
    path: Path;
    skills: CharacterSkills;
    memosprite?: CharacterMemosprite;
    traces: (CharacterTraceNodeMain | CharacterTraceNodeSmall)[];
    eidolon: CharacterEidolons;
    stats: CharacterStats;
    materials: CharacterMaterials;
    description: string;
    gender: "Male" | "Female" | "Adaptive";
    faction: string;
    world: World;
    keywords?: SkillKeywords;
    outfits: CharacterOutfit[];
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export type CharacterSkillKey = keyof CharacterSkills;
export interface CharacterSkills {
    attack: CharacterSkill[];
    skill: CharacterSkill[];
    ultimate: CharacterSkill[];
    talent: CharacterTalent[];
    technique: CharacterTechnique[];
}

export type CharacterSkillTag =
    | "Single Target"
    | "Blast"
    | "AoE"
    | "Bounce"
    | "Enhance"
    | "Support"
    | "Impair"
    | "Restore"
    | "Defense"
    | "Summon";

export interface CharacterSkill extends SkillWithScaling {
    tag?: CharacterSkillTag;
    cost: {
        value: number | string;
        type: string;
    };
    regen?: number;
    break?: Record<"Single Target" | "Blast" | "AoE", number>;
    showIcon?: boolean;
}
export type CharacterTalent = Omit<CharacterSkill, "cost">;
export type CharacterTechnique = Omit<CharacterSkill, "cost" | "scaling">;

export type BonusStat = keyof typeof characterBonusStats;

export type CharacterUnlockKeys =
    | "Lv. 1"
    | "A2"
    | "A3"
    | "A4"
    | "A5"
    | "A6"
    | "Lv. 75"
    | "Lv. 80";

export interface CharacterTraceNodeData {
    id: string;
    title: string;
    description: string;
    unlock: CharacterUnlockKeys;
    stat?: BonusStat;
}

export interface CharacterTraceNodeMain {
    name: string;
    description: string;
    unlock: CharacterUnlockKeys;
    subTraces?: CharacterTraceNodeSmall[];
}

export interface CharacterTraceNodeSmall {
    stat: BonusStat;
    unlock: CharacterUnlockKeys;
    subTraces?: (CharacterTraceNodeMain | CharacterTraceNodeSmall)[];
}

export interface CharacterEidolons {
    e1: Skill;
    e2: Skill;
    e3: Skill;
    e4: Skill;
    e5: Skill;
    e6: Skill;
}

export interface CharacterStats {
    hp: number[];
    atk: number[];
    def: number[];
    speed: number[];
    taunt: number[];
}

export type CharacterMemospriteSkillKey = Exclude<
    keyof CharacterMemosprite,
    "name"
>;
export interface CharacterMemosprite {
    name: string;
    skill: MemospriteSkill[];
    talent: MemospriteSkill[];
}

export type MemospriteSkill = Partial<CharacterSkill>;

export interface CharacterOutfit {
    name: string;
    displayName?: string;
    rarity: Rarity;
    description: string;
}
